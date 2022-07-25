import React from "react";

// styleをjsにもってきてコンポーネントに含んじゃうよ
// styles.cssからインプットエリアに関する関心を取り除くことが出来た。
// このエリアのスタイルを変更したい場合はこのファイルを参照すればよい
const style = {
  // プロパティはキャメルケース、値は文字列として認識させる
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  padding: "8px",
  margin: "8px auto",
  borderRadius: "8px"
};

export const InputTodo = (props) => {
  // 親コンポーネントから受け取ったプロップスの中身を使いやすいように抽出
  const { todoText, onChange, onClick, disabled } = props;
  return (
    <div style={style}>
      {/* disabled属性を追加できるように親子でprops追加しよか */}
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};
