import NavLink from "./navLink/navLink";
import styles from "./links.module.css";

const Links = () => {
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

  return (
    <div className={styles.links}>
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
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
