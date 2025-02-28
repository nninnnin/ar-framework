import { css } from "@emotion/react";

const common = {
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #fff;
  `,
  button: css`
    text-align: center;
    background-color: black;
    color: white;

    cursor: pointer;
    user-select: none;
  `,
};

export const dialogStyles = {
  small: css`
    background-color: #fff;

    width: 300px;
    text-align: center;

    display: flex;
    flex-direction: column;
    gap: 1.2em;

    & .dialog-header {
      ${common.header}

      border-bottom: 1px solid black;

      height: 2em;
    }

    & .dialog-close-button {
      cursor: pointer;

      width: 2em;
      height: 2em;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    & .dialog-contents-container {
      width: 100%;
      flex: 1;

      display: flex;
      flex-direction: column;
      gap: 1em;

      padding-left: 1em;
      padding-right: 1em;
    }

    & .dialog-button-container {
      display: flex;
      justify-content: center;
      gap: 10px;

      margin-bottom: 1em;
    }

    & .dialog-button {
      ${common.button}

      padding: 0.5em 1em 0.5em 1em;
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

    & .dialog-header {
      ${common.header}

      width: 100%;
      height: 36px;

      border-bottom: 1px solid black;
    }

    & .dialog-close-button {
      cursor: pointer;

      width: 36px;
      height: 36px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

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

      border-top: 1px solid black;

      background-color: black;
      gap: 1px;
    }

    & .dialog-button {
      ${common.button}

      padding: 1em;

      background-color: white;
      color: black;
      flex: 1;
    }
  `,
};
