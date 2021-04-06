import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import Item from "../../src/component/Item";
import Head from "next/head";

const Post = ({ item, name }) => {
  // const Post = () => {
  // const router = useRouter();
  // const { id } = router.query;
  // const [isLoading, setIsLoading] = useState(true);
  // const [item, setItem] = useState({});
  // const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  // function getData() {
  //     Axios.get(API_URL).then((res) => {
  //         setItem(res.data);
  //         setIsLoading(false);
  //     });
  // }

  // useEffect(() => {
  //     if (id && id > 0) {
  //         getData();
  //     }
  // }, [id]);

  return (
    <>
      {/* {isLoading ? (
        <div style={{ padding: "300px 0" }}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      ) : (
        <Item item={item} />
        )} */}
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description} />
          </Head>
          {name} 환경 입니다.
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

// SSR
export async function getServerSideProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}
