import { useState } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import styles from "./Gallery.module.scss";
import { ENV } from "@/utils";
import { FullModal } from "@/components/Shared";
import Slider from "react-slick";

export function Gallery(props) {
  const { screenshots } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  const screenshotsClone = [...screenshots];
  const principalImage = screenshotsClone.shift();

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image
            src={`${ENV.SERVER_HOST}${principalImage.attributes.url}`}
            onClick={onOpenClose}
          />
        </div>

        <div className={styles.grid}>
          {map(screenshotsClone, (screenshot) => (
            <div key={screenshot.id}>
              <Image
                src={`${ENV.SERVER_HOST}${screenshot.attributes.url}`}
                onClick={onOpenClose}
              />
            </div>
          ))}
        </div>
      </div>

      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider>
            {map(screenshots, (screenshot) => (
              <div key={screenshot.id}>
                <Image src={`${ENV.SERVER_HOST}${screenshot.attributes.url}`} />
              </div>
            ))}
          </Slider>
        </div>
      </FullModal>
    </>
  );
}
