import { useState, useEffect } from "react";
import { getVideosList } from "../service/service";
import { DEFAULT_YT_QUERY, INITIAL_DATA } from "../utils/constants";

const useYouTubeData = (defaultQuery = DEFAULT_YT_QUERY) => {
    const [data, setData] = useState(INITIAL_DATA);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [error, setError] = useState(null);

    const getYouTubeData = (query = "", loadMore = false) => {
        setError(null);

        if (currentVideo && !loadMore) {
            setCurrentVideo(null);
        }

        if (!loadMore && data?.videos?.length > 0) {
            setData({ ...data, videos: [] });
        }

        setIsPageLoading(true);
        const { pageSize, pageToken } = data;

        getVideosList({ query, pageToken, pageSize })
            .then(({ videos, pageToken, pageSize, totalResults }) => {
                setData((prevData) => ({
                    videos: loadMore ? [...prevData?.videos, ...videos] : videos,
                    pageToken,
                    pageSize,
                    totalResults,
                    query,
                }));
            })
            .catch(() => {
                setError("Failed to fetch data. Please try again.");
            })
            .finally(() => setIsPageLoading(false));
    };

    useEffect(() => {
        getYouTubeData(defaultQuery);
    }, []);

    return { data, currentVideo, isPageLoading, getYouTubeData, setCurrentVideo, error };
};

export default useYouTubeData;
