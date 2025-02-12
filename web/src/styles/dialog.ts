import { css } from "@emotion/react";

export const dialogStyles = {
  small: css`
    background-color: #fff;
    padding: 1em;

    display: flex;
    flex-direction: column;
    gap: 1.2em;

    & .dialog-contents-container {
      width: 100%;
      flex: 1;

      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    & .dialog-button-container {
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    & .dialog-button {
      padding: 0.5em 1em 0.5em 1em;
      background-color: black;
      color: white;
    }
  `,
  large: css`
    background-color: #fff;

    width: 800px;
    height: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .dialog-contents-container {
      width: 100%;
      flex: 1;

      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    & .dialog-button-container {
      width: 100%;
      display: flex;

      border-top: 1px solid #000;

      background-color: black;
      gap: 1px;
    }

    & .dialog-button {
      flex: 1;
      padding: 1em;

      text-align: center;
      background-color: #fff;
      color: #000;

      cursor: pointer;
    }
  `,
};
