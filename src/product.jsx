import { useState, useEffect } from "react";
import "./product.css";

export default function Product({
  name,
  price,
  type,
  desc,
  image,
  score,
  setScore,
  currentCoinStyle,
  setCoinStyle,
  currentTheme,
  setThemeStyle,
  currentBadge,
  setBadgeStyle,
}) {
  const [owned, setOwned] = useState(false);
  const t = (type || "").toLowerCase();
  const isCoin = ["gold", "silver", "bronze", "black"].includes(t);
  const isTheme = ["galaxy-bg", "inferno", "frost", "emerald"].includes(t);
  const isBadge = ["crown", "trophy", "goodluck"].includes(t);

  useEffect(() => {
    const ownedItems = JSON.parse(localStorage.getItem("ownedItems") || "[]");
    if (ownedItems.includes(name)) setOwned(true);
  }, [name]);

  const canAfford = score >= price;
  const isCurrent =
    (isCoin && currentCoinStyle === t) ||
    (isTheme && currentTheme === t) ||
    (isBadge && currentBadge === t);

  const handleBuy = () => {
    if (owned) return alert("You already own this item!");
    if (!canAfford) return alert("Not enough fortunes!");
    setScore(score - price);
    setOwned(true);
    const ownedItems = JSON.parse(localStorage.getItem("ownedItems") || "[]");
    ownedItems.push(name);
    localStorage.setItem("ownedItems", JSON.stringify(ownedItems));
    if (isCoin) {
      setCoinStyle(t);
      localStorage.setItem("coinStyle", t);
    } else if (isTheme) {
      setThemeStyle(t);
      localStorage.setItem("themeStyle", t);
    } else if (isBadge) {
      setBadgeStyle(t);
      localStorage.setItem("badgeStyle", t);
    }
    alert(`You bought ${name}!`);
  };

  const handleUse = () => {
    if (!owned) return alert("You don't own this yet!");
    if (isCurrent) return alert("Already in use!");
    if (isCoin) {
      setCoinStyle(t);
      localStorage.setItem("coinStyle", t);
    } else if (isTheme) {
      setThemeStyle(t);
      localStorage.setItem("themeStyle", t);
    } else if (isBadge) {
      setBadgeStyle(t);
      localStorage.setItem("badgeStyle", t);
    }
    alert(`You are now using ${name}!`);
  };

  return (
    <div className={`product-card ${isCurrent ? "in-use" : ""}`}>
      <img src={image} alt={name} className="product-img" />
      <h3>{name}</h3>
      <p className="desc">{desc}</p>
      <p className="price">{price} fortunes</p>
      {owned ? (
        <button onClick={handleUse} disabled={isCurrent} className={isCurrent ? "owned-btn" : "use-btn"}>
          {isCurrent ? "In Use" : "Use"}
        </button>
      ) : (
        <button onClick={handleBuy} disabled={!canAfford} className={!canAfford ? "disabled-btn" : ""}>
          {canAfford ? "Buy" : "Too Expensive"}
        </button>
      )}
    </div>
  );
}
