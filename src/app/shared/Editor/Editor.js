import "@wangeditor/editor/dist/css/style.css";

import { Editor as WangEditor, Toolbar } from "@wangeditor/editor-for-react";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { useState, useEffect } from "react";

i18nChangeLanguage("en");

const Editor = ({ value, onChange = () => {} }) => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          defaultConfig={{ excludeKeys: ["fullScreen"] }}
          editor={editor}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <WangEditor
          value={value}
          onCreated={setEditor}
          onChange={(editor) => onChange(editor.getHtml())}
          mode="default"
          style={{ minHeight: "200px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
};

export default Editor;
