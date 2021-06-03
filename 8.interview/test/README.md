Timer Phase
이벤트 루프의 시작을 알리는 페이즈이다. 이 페이즈가 가지고 있는 큐에는 SetTimeout이나 Setinterval 같은 타이머들의 콜백을 저장하게 된다. 타이머들을 min-heap으로 유지하고 있다가 실행할 때가 되면 콜백을 큐에 넣고 실행하는 것이다.

큐에 콜백을 넣는다는 것은, 해당 콜백을 실행한다는 의미로, 타이머가 생성되자마자 큐에서 콜백을 넣는 것이 아니라, 별도의 힙에 타이머를 저장하고 나서 매 Timer Phase 때 어떤 타이머가 실행할 때가 되었는지 확인 후, 실행할 때가 된 콜백을 큐에 넣어서 실행된다.

Pending I/O callback phase
이벤트 루프의 Pending Queue에 들어있는 콜백들을 실행한다. 해당 큐의 콜백은 TCP 오류 같은 시스템 작업의 콜백을 반환한다.

타임 페이즈가 종료된 후 이벤트 루프는 Pending I/O phase에 진입하고, 가장 먼저 이전 작업들의 콜백이 실행 대기 중인지, 체크하게 된다. 만약 실행 대기 중이라면 해당 큐의 콜백들을 전부 비워질 때까지 실행한다. 이 과정이 종료되면 이벤트 루프는 Idle Handler Phase로 이동하게 된 후 내부 처리를 위한 Prepare phase를 거쳐 최종적으로 가장 중요한 단계인 Poll Phase에 도달하게 된다.

Poll phase
이벤트 루프가 해당 페이즈로 진입하면, 내부의 watcher_queue(Poll Phase가 가지고 있는 큐)의 콜백 내용들이 있는지 확인 후 있는 콜백들을 실행한다.
만약 더 이상 콜백들을 실행할 수 없는 상태가 된다면 check_queue, pending_queue, closing_callbacks_queue에 해야 할 작업이 있는지를 검사하고, 있다면 바로 Poll phase가 종료되고 다음 페이즈로 넘어가게 된다. 하지만 해야 할 작업이 없는 경우 Poll phase는 다음 페이즈로 넘어가지 않고 계속 대기하게 된다.

Check phase
Poll phase가 지나면 이벤트 루프는 바로 setImmediate() API의 콜백과 관련이 있는 Check phase에 들어서게 된다. 이 페이즈에서는 다른 페이즈와 마찬가지로 큐가 비거나 시스템 실행 한도 초과에 도달할 때까지 계속해서 setImmediate의 콜백들을 실행한다.

Close callbacks
Check Phase가 종료된 후에, 이벤트 루프의 다음 목적지는 close나 destroy 콜백 타입들을 관리하는 Close callback이다.

이벤트 루프가 Close callback들과 함께 종료되고 나면 이벤트 루프는 다음에 돌아야 할 루프가 있는지 다시 체크하게 된다. 만약 아니라면 그대로 이벤트 루프는 종료된다. 하지만 만약 더 수행해야 할 작업들이 남아 있다면 이벤트 루프는 다음 순회를 돌기 시작하고 다시 Timer Phase부터 시작하게 된다.

nextTickQueue & microTaskQueue
이 두 개는 이벤트 루프의 일부가 아니라 Node.js 또는 브라우저 자체에 포함된 기술이다.
이 두 개의 큐에 들어있는 콜백들은 어떤 페이즈에서든 실행될 수 있다. 페이즈에서 다음 페이즈로 넘어가기 전에 자신이 가지고 있는 콜백들을 최대한 빨리 실행해야 하는 역할을 맡고 있기 때문이다. 또한 nextTickQueue는 microTaskQueue보다는 높은 우선순위를 가지고 있다.

nextTickQueue는 process.nextTick() API 콜백들을 가지고 있고, microTaskQueue는 Resolve 된 프로미스의 콜백을 가지고 있다.
