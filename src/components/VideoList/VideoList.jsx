import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import {
  AutoSizer,
  WindowScroller,
  InfiniteLoader,
  List,
} from "react-virtualized";
import "./VideoList.css";

const VideoList = (props) => {
  const isRowLoaded = ({ index }) => {
    return !!props?.videos[index];
  };

  const wait = () => { };

  const loadMoreRows = props?.isPageLoading
    ? wait
    : () => props.loadMore();

  const rowRenderer = ({ key, index, style }) => {
    return (
      <VideoItem
        key={key}
        index={index}
        style={style}
        video={props?.videos[index]}
        onSelectVideo={props?.onSelectVideo}
      />
    );
  };

  return (
    <div data-testid="video-list"  className={`list-container ${props?.selectedVideo ? 'shrink' : ''}`}>
      <AutoSizer disableHeight={true}>
        {({ width }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={props?.totalResults}
              >
                {({ onRowsRendered, registerChild }) => (
                  <List
                    autoHeight
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={props?.videos?.length}
                    rowHeight={100}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    width={width}
                  />
                )}
              </InfiniteLoader>
            )}
          </WindowScroller>
        )}
      </AutoSizer>
      {props?.isPageLoading && <span>Loading...</span>}
    </div>
  );
};

export default VideoList;
