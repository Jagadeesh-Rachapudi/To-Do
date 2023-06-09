import classNames from "classnames";
import useNavigation from "../hooks/useNavigation";
import "./utils.scss";

function Link({ to, children, className, activeClassName, handleClose }) {
  const { navigate, currentPath } = useNavigation();

  const classes = classNames(
    "text-stone-700",
    "no-underline font-medium pb-1",
    className,
    currentPath === to && activeClassName
  );

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    handleClose();
    navigate(to);
  };

  return (
    <a className={classes} onClick={handleClick} href={to}>
      {children}
    </a>
  );
}

export default Link;
