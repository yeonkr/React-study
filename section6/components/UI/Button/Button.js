import styles from "./Button.module.css";
// css 모듈 임포트. 중간에 모듈을 추가해 css 파일을 모듈로 작동하도록 컴파일 프로세스에게 보내는 것
// css모듈은 클래스나 파일을 가지고 그 클래스 이름을 고유하게 바꾸는 것이다.
// 고유한 버전의 스타일과 클래스를 설정하고 만들어내 래핑한다.
// css 컴포넌트에 한정된다는 것을 확실하게 해준다.

// const Button = styled.button`
//   width: 100%;
//   font: inherit;
//   padding: 0.5rem 1.5rem;
//   border: 1px solid #8b005d;
//   color: white;
//   background: #8b005d;
//   box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//   cursor: pointer;

//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;

const Button = (props) => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
