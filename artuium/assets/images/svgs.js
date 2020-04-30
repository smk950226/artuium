import React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const WrittenReviewIcon = props => {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <Path stroke="#fff" d="M.5.5h35v35H.5z" />
      <Path
        d="M17 9.121h-7a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.5 7.621a2.121 2.121 0 013 3l-9.5 9.5-4 1 1-4 9.5-9.5z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const LikedExhibitionIcon = props => {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <Path stroke="#fff" d="M.5.5h35v35H.5z" />
      <Path
        opacity={0.9}
        d="M24.571 24.105H12.43c-1.342 0-2.429.12-2.429.269v2.147c0 .148 1.087.268 2.429.268H24.57c1.342 0 2.429-.12 2.429-.268v-2.147c0-.148-1.087-.269-2.429-.269zM13.579 19.76v-3.835c0-.424-.12-.767-.268-.767h-2.148c-.148 0-.268.343-.268.767v3.834c0 .424.12.767.268.767h2.148c.148 0 .268-.343.268-.767zM19.842 19.76v-3.835c0-.424-.12-.767-.268-.767h-2.148c-.148 0-.268.343-.268.767v3.834c0 .424.12.767.268.767h2.148c.148 0 .268-.343.268-.767zM26.105 19.76v-3.835c0-.424-.12-.767-.268-.767h-2.148c-.148 0-.268.343-.268.767v3.834c0 .424.12.767.268.767h2.148c.148 0 .268-.343.268-.767zM27 9.163c0-.148-7.159-2.952-8.5-2.952-1.341 0-8.5 2.804-8.5 2.952v2.147c0 .149 1.087.269 2.429.269H24.57c1.342 0 2.429-.12 2.429-.269V9.163z"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const LikedArtworkIcon = props => {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <G>
        <Path stroke="#fff" d="M.5.5h35v35H.5z" />
        <Path
          d="M27 20.998v-8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4a2 2 0 00-1 1.73v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4a2 2 0 001-1.73z"
          stroke={props.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.27 11.958l8.73 5.05 8.73-5.05M18 27.078v-10.08"
          stroke={props.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0 0v-1h-1v1h1zm36 0h1v-1h-1v1zm0 36v1h1v-1h-1zM0 36h-1v1h1v-1zM0 1h36v-2H0v2zm35-1v36h2V0h-2zm1 35H0v2h36v-2zM1 36V0h-2v36h2z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};

export const LikedReviewIcon = props => {
  return (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <G>
        <Path stroke="#fff" d="M.5.5h35v35H.5z" />
        <Path
          d="M26.5 7.621a2.121 2.121 0 013 3l-9.5 9.5-4 1 1-4 9.5-9.5z"
          stroke={props.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.296 9.419a5.5 5.5 0 00-1.785 1.193l-1.06 1.06-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 001.193-1.785"
          stroke={props.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M0 0v-1h-1v1h1zm36 0h1v-1h-1v1zm0 36v1h1v-1h-1zM0 36h-1v1h1v-1zM0 1h36v-2H0v2zm35-1v36h2V0h-2zm1 35H0v2h36v-2zM1 36V0h-2v36h2z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
};
