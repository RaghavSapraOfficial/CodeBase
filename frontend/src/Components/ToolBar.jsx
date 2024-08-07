import Settings from "./Settings.jsx";
import { CODE_SNIPPETS } from "../Utils/languages.jsx";
import { useState } from "react";
import toast from "react-hot-toast";
const ToolBar = (props) => {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const handleFileChecked = () => {
    props.setFileChecked(!props.fileChecked);
  };

  const handleOutputChecked = () => {
    props.setOutputChecked(!props.outputChecked);
  };

  const handleCheckboxSubmit = () => {
    props.zipAndDownload();
    props.setSelected(0);
    setShowDownloadOptions(false);
    
  }
  const handleSelected = (e) => {
    if (props.selected === e) {
      props.setSelected(0);
    } else {
      props.setSelected(e);
    }


    switch (e) {
      case 1:
        props.setFolderOpen(true);
        props.setSelected(3);
        if (props.folderIndex !== -1) {
          // console.log("For folderindex ", props.folderIndex);
          let lastFileIndex =
            props.folderfiles.folders[props.folderIndex].files.length - 1;
          lastFileIndex = lastFileIndex >= 0 ? lastFileIndex : 0;
          props.setFileIndex(lastFileIndex);
          props.setOpenNewFile(true);
        } else {
          // console.log("extra file");
          props.setOpenExtraNewFile(true);

          let lastExtraFileIndex = props.folderfiles.extraFiles.length - 1;
          lastExtraFileIndex = lastExtraFileIndex >= 0 ? lastExtraFileIndex : 0;
          props.setExtraFileIndex(lastExtraFileIndex);
        }

        props.setLanguage("Choose_Language");
        props.setValue(CODE_SNIPPETS["Choose_Language"]);

        break;

      case 2:
        props.updateChangeCode();
        props.setSelected(0);
        break;

      case 3:
        props.setFolderOpen(!props.folderopen);
        // props.setFolderIndex(-1);
        // props.setFileIndex(-1);
        break;

      case 4:
        setShowDownloadOptions(true);
        if (props.selected === 4) { props.setSelected(0); }
        // props.zipAndDownload();
        // props.setSelected(0);
        break;
      case 5:
        props.setHistoryOpen(!props.historyOpen);
        break;
      case 6:
        navigator.clipboard
          .writeText(props.value)
          .then(() => {
            props.setSelected(0);
            toast.success("Code successfully copied to Clipboard!");
          })
          .catch((err) => {
            toast.error("Error in copying ");
          });
        break;

      case 7:
        props.setSettingsOpen(!props.settingsopen);
        break;

      case 8:
        props.setShareOpen(!props.shareOpen);
        console.log("share opened");
        props.setSelected(0);
        break;

      case 9:
        props.setInfoOpen(!props.infoOpen);
        console.log("info opened");
        props.setSelected(0);
        break;

      default:
        props.setSelected(0);
        break;
    }
  };

  return (
    <div className="flex p-0 h-full ">
      {props.toolBar === true ? (
        <div
          className={`border-r-2 border-[#d1d5db] flex flex-col items-center  justify-between gap-3 w-12  ${
            props.lightmode ? "" : "bg-[#1e1e1e]"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`ml-1  h-auto py-1 flex justify-center items-center  w-full pt-2 ${
                props.selected === 1
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(1)}
            >
              <img
                src={"./Icons/SelectFile.png"}
                alt="Select File"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 2
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(2)}
            >
              <img
                src={"./Icons/Save.png"}
                alt="Save"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 3
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(3)}
            >
              <img
                src={"./Icons/Folder.png"}
                alt="Folder"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div>
              <div
                className={`      ml-1  h-auto py-1 flex justify-center items-center w-full ${
                  props.selected === 4
                    ? `border-l-4 ${
                        props.lightmode ? "border-blue-900" : "border-white"
                      }`
                    : ""
                } cursor-pointer hover:border-l-4 ${
                  props.lightmode
                    ? `hover:border-blue-900`
                    : `hover:border-white`
                }`}
                onClick={() => handleSelected(4)}
              >
                <img
                  src={"./Icons/Download.png"}
                  alt="Download"
                  className="!h-[24px] !w-[24px]"
                />
              </div>
              {/* Download Options */}

              {showDownloadOptions === true ? (
                <div
                  className={`absolute left-14 py-4 px-6 flex flex-col items-start  justify-center z-10 rounded-lg shadow-lg border ${
                    props.lightmode === true
                      ? "bg-gray-100 text-[#1e1e1e]"
                      : "bg-[#1e1e1e] text-white"
                  }`}
                >
                  <div className="flex items-center gap-6">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="files"
                      checked={props.fileChecked}
                      onChange={handleFileChecked}
                      className="mr-2"
                    />
                    <label
                      htmlFor="files"
                      className={`flex items-center ${
                        props.fileChecked === true ? "font-bold" : ""
                      }`}
                    >
                      Files
                      
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="output"
                      checked={props.outputChecked}
                      onChange={handleOutputChecked}
                      className="mr-2"
                    />
                    <label
                      htmlFor="output"
                      className={`flex items-center ${
                        props.outputChecked === true ? "font-bold" : ""
                      }`}
                    >
                      Output
                      
                    </label>
                  </div>
                  </div>
                  <button
                    onClick={handleCheckboxSubmit}
                    className={`mt-4 py-2 px-4 rounded ${
                      props.fileChecked || props.outputChecked
                        ? "bg-blue-500 text-white cursor-pointer"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed disabled"
                    } w-full`}
                    disabled={!props.fileChecked && !props.outputChecked}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 5
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(5)}
            >
              <img
                src={"./Icons/History.png"}
                alt="History"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`      ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 6
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(6)}
            >
              <img
                src={"./Icons/Clipboard.png"}
                alt="Clipboard"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 8
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(8)}
            >
              <img
                src={"./Icons/Share.png"}
                alt="Share"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 9
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(9)}
            >
              <img
                src={"./Icons/Info.png"}
                alt="Info"
                className="!h-[24px] !w-[24px]"
              />
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 10
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(10)}
            >
              <label>
                <img
                  src={"./Icons/Upload.png"}
                  alt="Upload"
                  className="!h-[24px] !w-[24px] cursor-pointer"
                />
                <input
                  type="file"
                  
                  multiple
                  onChange={props.handleFileUpload}
                  className="hidden"
                  name="upload"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full  ${
                props.selected === 7
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
            >
              <img
                onClick={() => handleSelected(7)}
                src={"./Icons/Settings.png"}
                alt="Settings"
                className="!h-[24px] !w-[24px]"
              />

              {props.settingsopen === true ? (
                <div
                  className={`absolute left-14 bottom-16 py-2 z-10 rounded bg-transparent ${
                    props.lightmode === true ? " text-black" : "text-white"
                  }`}
                >
                  <Settings
                    lightmode={props.lightmode}
                    setLightMode={props.setLightMode}
                    handleLight={props.handleLight}
                    formatCode={props.formatCode}
                    wordWrap={props.wordWrap}
                    setWordWrap={props.setWordWrap}
                    settingsopen={props.settingsopen}
                    setSettingsOpen={props.setSettingsOpen}
                    setSelected={props.setSelected}
                    keyboardShortcut={props.keyboardShortcut}
                    setKeyboardShortcut={props.setKeyboardShortcut}
                    fontSize={props.fontSize}
                    setFontSize={props.setFontSize}
                    email={props.email}
                    setEmail={props.setEmail}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className={`     ml-1  h-auto py-1 flex justify-center items-center w-full ${
                props.selected === 11
                  ? `border-l-4 ${
                      props.lightmode ? "border-blue-900" : "border-white"
                    }`
                  : ""
              } cursor-pointer hover:border-l-4 ${
                props.lightmode ? `hover:border-blue-900` : `hover:border-white`
              }`}
              onClick={() => handleSelected(11)}
            >
              <img
                src={"./Icons/More.png"}
                alt="Info"
                className="!h-[24px] !w-[24px]"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ToolBar;
