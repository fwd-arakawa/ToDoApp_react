import React from "react";

// 親のpropsを引数として受け取ることで、関数内でも使えるようになるよね
export const IncompleteTodos = (props) => {
  // propsを受け取って親コンポーネントで決めた名前の変数に格納
  // 格納したら子コンポーネント内の名称と一致させる
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {/* map関数で配列の中身の数だけループさせてリストを生成していく */}
        {/* ループでレンダリングしていく中でインデックス番号を知りたい場合は第２引数を追加 */}
        {todos.map((todo, index) => {
          return (
            // ループ使うには親タグにkeyが必須
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickComplete(index)}>完了</button>
              {/* 関数に引数を渡したい場合はコールバック関数化する */}
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
