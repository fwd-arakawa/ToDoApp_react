import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // TODO追加機能
  const [todoText, settodoText] = useState("");

  // 未完了のTODOを格納する配列を作成
  const [incompleteTodos, setincompleteTodos] = useState([]);
  const [completeTodos, setcomleteTodos] = useState([]);

  // event.target.valueにはinput要素にonchangeで変更があった場合(実際の入力内容)に入ってくる
  const onChangeTodoText = (event) => settodoText(event.target.value);

  // 追加ボタン押下時の処理
  // ★配列にテキストを追加していくだけで、ステートが変更されて再レンダリングされる..を繰り返す！すごい。
  const onClickAdd = () => {
    // テキストボックスが空の場合は何の処理も走らせない
    if (todoText === "") return;
    // スプレッド構文で配列の結合をする
    const newTodos = [...incompleteTodos, todoText];
    // 新しい配列をincomletetodos配列にsetすることでどんどん増やしていける
    setincompleteTodos(newTodos);
    //テキストボックスのvalueに残っている情報を初期化
    settodoText("");
  };

  // 未完了リストの削除ボタンが押された場合の処理
  const onClickDelete = (index) => {
    // indexの値に応じてincomletetodosの中身を削除したい
    // スプレッド構文で配列をコピーする、参照を引き継がない
    const newTodos = [...incompleteTodos];
    // splice関数：第１引数にインデックス番号を指定して、第２引数にいくつ削除するか指定
    newTodos.splice(index, 1);
    // setincompletetodosで配列を更新
    setincompleteTodos(newTodos);
  };

  // 未完了リストの完了ボタンが押された場合の処理
  const onClickComplete = (index) => {
    // 未完了のリストをコピーし、該当の項目を削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    // 既存の完了リストをコピーしたうえで、未完了リストから移動した１行を追加する
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    // ★未完了リスト・完了リスト両方の配列を更新
    setincompleteTodos(newIncompleteTodos);
    setcomleteTodos(newCompleteTodos);
  };

  // 完了リストの戻すボタンが押された場合の処理
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    // コピーした配列の要素を追加するとsplice関数で削除してるからテキストの参照が出来なくなる！
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setcomleteTodos(newCompleteTodos);
    setincompleteTodos(newIncompleteTodos);
  };

  // レンダリング
  return (
    <>
      {/* props名は自由に決められる */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        // どういう条件で子コンポーネントにpropsとしてtrueを渡すか書いてね
        // 更に、ここではincompletetodosのステートを常に見ているため、
        // リストの数が５より減れば、falseとなり、機能は再び使えるようになる。すごいね。
        disabled={incompleteTodos.length >= 5 && true}
      />
      {/* todoが５個以上になる場合にエラー文を出す */}
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは５個までです。消化してください。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

// コンポーネント分割のメリット：
// ①コードの見通しが良くなる　この画面がどういう要素で成り立っているか直感的に理解できる
// ②他の画面でも各コンポーネントを再利用できるようになる（各コンポーネントの抽象度を上げる必要はある）
