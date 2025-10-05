import './navBar.css';

function NavBar({ score, currentBadge }) {
  const badgeSrc =
    currentBadge === "crown" ? "/crown.jpeg" :
    currentBadge === "trophy" ? "/trophy.jpg" :
    currentBadge === "goodluck" ? "/good-luck.jpg" : "";

  return (
    <div className="navBarLeft">
      <img src="/dollar.png" alt="" />
      <p>: {score} fortunes</p>
      {badgeSrc && (
        <img src={badgeSrc} alt={currentBadge} className="nav-badge-img" />
      )}
    </div>
  );
}

export default NavBar;
