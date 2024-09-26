import React from "react";
import { CaretRight } from "@phosphor-icons/react";

import { IItemsProps } from "./interfaces";
import { LinkComponent } from "../Link/Link";
import styles from "./Breadcrumbs.module.css";

const Breadcrumb: React.FC<IItemsProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      <ul>
        {items.map((item, index) => (
          <li key={index} data-testid={`link-${index}`}>
            <LinkComponent
              className={styles.link}
              href={item.link}
              data-testid={`href-${index}`}
            >
              <span>{item.label}</span>
              {index < items.length - 1 ? (
                <CaretRight className={styles.arrowIcon} />
              ) : null}
            </LinkComponent>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
