import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import Item from "../../src/component/Item";
import Head from "next/head";

const Post = ({ item, name }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: "300px 0" }}>
        <Loader inline="centered" active>
          Loading
        </Loader>
      </div>
    );
  } else {
    return (
      <>
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
  }
};
export default Post;

export async function getStaticPaths() {
  const apiUrl = process.env.apiUrl;
  const res = await Axios.get(apiUrl);
  const data = res.data;
  return {
    // paths: [
    //   { params: { id: "740" } },
    //   { params: { id: "730" } },
    //   { params: { id: "729" } },
    // ],
    paths: data.slice(0, 9).map((item) => ({
      params: { id: item.id.toString() },
    })),
    fallback: true,
    //     fallback: false, // false면 없는 페이지는 아무 대응 안해줌
  };
}

export async function getStaticProps(context) {
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
