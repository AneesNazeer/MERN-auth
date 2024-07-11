import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { getCookie } from "utils";
import parse from "html-react-parser";

export const getLocalUserData = () => {
  var localUser = JSON.parse(getCookie("_user_data"));
  return localUser;
};

export const trimText = (str = "", length = 35, tail = "...") => {
  if (str?.length > length) {
    return str.substring(0, length - tail.length) + tail;
  } else {
    return str;
  }
};

export const textToCamelCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const handleValueFormat = (value) => {
  return /^[0-9]+$/.test(value) ? parseInt(value) : null;
};

export const successMessage = async (text) => {
  if (text === null || text === undefined || text === "")
    text = "Data saved successfully!";
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#4fbe87",
  }).showToast();
};

export const successDeletedMessage = async (text) => {
  successMessage("Data deleted successfully!");
};

export const infoMessage = async (text) => {
  if (text === undefined || text === "") return;
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#4fbe87",
    selector: "toastMessage",
  }).showToast();
};

export const errorMessage = async (text) => {
  if (text === null || text === undefined || text === "") text = "Error";
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#f93e3e",
  }).showToast();
};

export const isPositiveNumber = ({ value, isAcceptZero = false }) => {
  const regex = /^\d+$/;
  const result = regex.test(value);
  if (isAcceptZero) {
    if (result) {
      return parseInt(value);
    } else {
      return "";
    }
  } else {
    if (result && value > 0) {
      return parseInt(value);
    } else {
      return "";
    }
  }
};

export const trimHtmlContent = (htmlContent, lettersCount) => {
  const regex = /(<([^>]+)>)/gi;
  let convertedHtml = htmlContent.replace(regex, "");
  return trimText(convertedHtml, lettersCount);
};

export const removeNullAndEmptyStringKeys = (obj) => {
  const filteredObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] !== null && obj[key] !== "") {
        filteredObj[key] = obj[key];
      }
    }
  }
  return filteredObj;
};

export const downloadPdf = async (url, certificateName) => {
  if (url) {
    let c_name = trimText(certificateName, 30, "");
    const fileName = c_name.split(" ").join("_");
    await fetch(url).then((response) => {
      response.blob().then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    });
  }
};

export const debounceFunction = (func, delay) => {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

export const validateFileSize = (file, maxSize, value) => {
  if (file && file.size > maxSize) {
    errorMessage("Course Logo Image size must be less than 2MB");
    value = "";
    return false;
  } else {
    return true;
  }
};

export const errorTextFormater = (error) => {
  let errorString = "";

  if (error.response) {
    if (error.response.data.message && !error.response.data.errors) {
      errorString = error.response.data.message;
    }
    if (error.response.data.errors !== null) {
      for (var err in error.response.data.errors) {
        errorString += error.response.data.errors[err];
      }
    } else if (!error.response.data.message) {
      errorString = "An error has occured!";
    }
  } else {
    errorString = "An error has occured!";
  }

  return <p className="p-2 text-danger">{parse(`${errorString}`)}</p>;
};

export const errorFormatter = (error) => {
  let errorString = "";

  if (error.response) {
    if (error.response.data.message && !error.response.data.errors) {
      errorString = error.response.data.message;
    }
    if (error.response.data.errors !== null) {
      for (var err in error.response.data.errors) {
        if (error.response.data.errors[err]?.msg) {
          errorString += error.response.data.errors[err].msg;
        } else {
          errorString += error.response.data.errors[err];
        }
      }
    } else if (!error.response.data.message) {
      errorString = "An error has occured!";
    }
  } else {
    errorString = "An error has occured!";
  }
  errorMessage(parse(`${errorString}`));
};

export const clearHistoryAndRedirect = (redirectTo) => {
  window.history.pushState(null, null, redirectTo);
  window.location.replace(redirectTo);
};
