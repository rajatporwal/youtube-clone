import { useState } from "react";
import { getVideosList } from "../service/service";

const defaultData = {
  videos: [],
  pageToken: "",
  pageSize: 15,
  totalResults: 0,
  query: '',
};

const useFetch = () => {
  const [data, setData] = useState(defaultData);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const getYouTubeData = (query = "", loadMore = false) => {
    setIsPageLoading(true);
    const { pageSize, pageToken } = data;
    getVideosList({ query, pageToken, pageSize })
      .then((responseObject) => {
        const { videos, pageToken, pageSize, totalResults } = responseObject;
        setIsPageLoading(false);
        let updatedVideos = [];
        if (loadMore) {
          updatedVideos = [...data.videos];
          updatedVideos = [...updatedVideos, ...videos];
        } else {
          updatedVideos = videos;
        }
        setData({
          videos: updatedVideos,
          pageToken: pageToken,
          pageSize: pageSize,
          totalResults: totalResults,
          query: query,
        });
      })
      .catch((error) => {
        console.log(error);
        setIsPageLoading(false);
      });
  };

  return { data, isPageLoading, getYouTubeData };
};

export default useFetch