// Friend.style.ts

import { css } from "@emotion/react";

export const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
`;

export const tabContainer = (activeTab: "friends" | "requests") => css`
  display: flex;
  width: 100%;
  max-width: 500px;
  margin-top: 1rem;
  padding: 0 1rem;
  button {
    flex: 1;
    background: #fff;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    border-top: 3px solid black;
    border-bottom: none;
    border-right: 3px solid black;

    &:nth-of-type(1) {
      border-left: 3px solid black;
      border-bottom: ${activeTab === "requests" ? "3px solid black" : "none"};
    }

    &:nth-of-type(2) {
      border-left: none;
      border-bottom: ${activeTab === "friends" ? "3px solid black" : "none"};
    }
  }

  .active {
    background-color: #d3e6ff;
  }
`;

export const FriendtContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  max-height: 75vh;
  overflow-y: auto;
  padding: 0 1rem;
  overflow: unset;
`;
