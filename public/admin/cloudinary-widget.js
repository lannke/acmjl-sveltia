// Custom Cloudinary Upload Widget for Sveltia CMS
const CLOUD_NAME = "dfv2us40f";
const UPLOAD_PRESET = "acmjl-preset";

const CloudinaryControl = ({ value, onChange, field }) => {
  const [uploading, setUploading] = React.useState(false);
  const [preview, setPreview] = React.useState(value || "");
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (data.secure_url) {
        setPreview(data.secure_url);
        onChange(data.secure_url);
      } else {
        alert("Erreur upload: " + (data.error?.message || "Erreur inconnue"));
      }
    } catch (err) {
      alert("Erreur upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      uploadToCloudinary(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToCloudinary(file);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
  };

  const styles = {
    container: {
      border: "2px dashed " + (dragOver ? "#E11D48" : "#ccc"),
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      backgroundColor: dragOver ? "rgba(225, 29, 72, 0.05)" : "#fafafa",
      transition: "all 0.2s",
      cursor: "pointer",
    },
    preview: {
      maxWidth: "100%",
      maxHeight: "200px",
      borderRadius: "4px",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "#E11D48",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "8px",
    },
    removeButton: {
      backgroundColor: "#666",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    spinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "2px solid #ccc",
      borderTopColor: "#E11D48",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  // Add keyframes for spinner
  React.useEffect(() => {
    if (!document.getElementById("cloudinary-widget-styles")) {
      const style = document.createElement("style");
      style.id = "cloudinary-widget-styles";
      style.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
      document.head.appendChild(style);
    }
  }, []);

  return React.createElement(
    "div",
    {
      style: styles.container,
      onDrop: handleDrop,
      onDragOver: (e) => { e.preventDefault(); setDragOver(true); },
      onDragLeave: () => setDragOver(false),
      onClick: () => !uploading && !preview && inputRef.current?.click(),
    },
    [
      React.createElement("input", {
        key: "input",
        ref: inputRef,
        type: "file",
        accept: "image/*",
        onChange: handleFileSelect,
        style: { display: "none" },
      }),
      uploading
        ? React.createElement("div", { key: "uploading" }, [
            React.createElement("div", { key: "spinner", style: styles.spinner }),
            React.createElement("p", { key: "text" }, "Upload en cours..."),
          ])
        : preview
        ? React.createElement("div", { key: "preview-container" }, [
            React.createElement("img", {
              key: "img",
              src: preview,
              style: styles.preview,
              alt: "Preview",
            }),
            React.createElement("div", { key: "buttons" }, [
              React.createElement(
                "button",
                {
                  key: "change",
                  type: "button",
                  style: styles.button,
                  onClick: (e) => { e.stopPropagation(); inputRef.current?.click(); },
                },
                "Changer"
              ),
              React.createElement(
                "button",
                {
                  key: "remove",
                  type: "button",
                  style: styles.removeButton,
                  onClick: (e) => { e.stopPropagation(); handleRemove(); },
                },
                "Supprimer"
              ),
            ]),
          ])
        : React.createElement("div", { key: "empty" }, [
            React.createElement("p", { key: "text1" }, "Glissez une image ici"),
            React.createElement("p", { key: "text2", style: { color: "#999", fontSize: "14px" } }, "ou cliquez pour sélectionner"),
          ]),
    ]
  );
};

const CloudinaryPreview = ({ value }) => {
  if (!value) return null;
  return React.createElement("img", {
    src: value,
    style: { maxWidth: "100%", maxHeight: "200px", borderRadius: "4px" },
    alt: "Preview",
  });
};

// Register the widget when CMS is ready
const registerWidget = () => {
  if (window.CMS) {
    CMS.registerWidget("cloudinary", CloudinaryControl, CloudinaryPreview);
    console.log("Cloudinary widget registered!");
  } else {
    setTimeout(registerWidget, 100);
  }
};
registerWidget();
