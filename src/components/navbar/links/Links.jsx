"use client";

import NavLink from "./navLink/navLink";
import styles from "./links.module.css";
import { useState } from "react";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Upload Video",
    path: "/uploadVideo",
  },
];
const Links = () => {
  const [open, setOpen] = useState(false);

  //TEMPORARY
  // const session = true;
  // const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {/* {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "admin", path: "/admin" }} />}
            <button className={styles.logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )} */}
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        Menu
      </button>
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;

//  <div className={styles.links}>
//    {links.map((link) => (
//      <Link href={link.path} key={link.title}>
//        {link.title}
//      </Link>
//    ))}
//  </div>;
