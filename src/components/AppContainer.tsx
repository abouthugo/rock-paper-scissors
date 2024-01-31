import { RouteSectionProps } from "@solidjs/router";
import styles from "../styles/AppContainer.module.css";

export default function AppContainer(props: RouteSectionProps) {
	return <section class={`${styles.container}`}>{props.children}</section>;
}
