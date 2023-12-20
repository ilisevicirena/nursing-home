export interface CodeMessage {
  code: number;
  message: string;
}

export function getError(code: number): string {
  var err = errors.find((x: CodeMessage) => x.code == code);
  var error = "Error " + code + ": " + err?.message;
  return err ? error : "Unknown error " + code;
}

var errors: CodeMessage[] = [
  // file error codes starting with 100
  { code: 101, message: "File type is not supported for preview." },
  { code: 102, message: "Multiple files not allowed." },
  { code: 103, message: "File download settings are not properly set." },
  { code: 104, message: "File preview settings are not properly set." },
  {
    code: 105,
    message: "Server endpoint responded with error. No file data provided.",
  },
  { code: 106, message: "File bytes attribute is not properly set." },

  // smart table error codes starting with 200
  {
    code: 201,
    message: "User picture from server settings are not properly set.",
  },
  {
    code: 202,
    message: "Server endpoint responded with error. No picture data provided.",
  },
  { code: 203, message: "Select editor server endpoint is not properly set." },
  {
    code: 204,
    message:
      "Select editor server endpoint responded with error. No data provided.",
  },
  { code: 205, message: "Select filter server endpoint is not properly set." },
  {
    code: 206,
    message:
      "Select filter server endpoint responded with error. No data provided.",
  },

  //select grid combo error codes starting with 300
  { code: 301, message: "Value attribute name must be set." },
  {
    code: 302,
    message:
      "Can not assign array to selected items when select-grid mode is not multiple. Assign single key instead.",
  },
  {
    code: 303,
    message:
      "Can not assign string to selected items when select-grid mode is multiple. Assign array of keys instead.",
  },
];
