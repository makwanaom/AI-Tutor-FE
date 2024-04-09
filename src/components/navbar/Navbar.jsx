
import styles from "./navbar.module.css"

import ThemeToggle from "../themeToggle/ThemeToggle"


export const Navbar = () => {
  return (
    <div className={styles.container}>
      
      <div className={styles.logo}>AI Learner</div>
      <div className={styles.links}>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar
