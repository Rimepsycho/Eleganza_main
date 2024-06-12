import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer>
        <div className={`${styles['footer-container']} `}>
          <div className={`row justify-content-between`}>
            <div className={`${styles.info} col-xl-4`}>
              <div className={`${styles.logo}`}>ELEGANZA</div>
              <p>
                Eleganza Violin Studio
                是一家提供小提琴及其配件產品、小提琴課程、音樂會場地和日常練習場地，以及音樂推廣講座的小提琴音樂工作室。{' '}
              </p>
              <hr className={`${styles.hr} d-block d-xl-none`} />
            </div>
            <div className={`links row col-xl-7 justify-content-between`}>
              <div className={`col`}>
                <div className={`row justify-content-between`}>
                  <div className={`${styles.link} col-sm mb-2`}>
                    <span className={`${styles.title}`}>產品販售</span>
                    <span>
                      <a href="">小提琴</a>
                    </span>
                    <span>
                      <a href="">琴盒/弓</a>
                    </span>
                    <span>
                      <a href="">配件</a>
                    </span>
                  </div>
                  <div className={`${styles.link} col-sm  mb-2`}>
                    <span className={`${styles.title}`}>小提琴課程</span>
                    <span>
                      <a href="">各級個別課</a>
                    </span>
                    <span>
                      <a href="">團體課</a>
                    </span>
                    <span>
                      <a href="">大師班</a>
                    </span>
                  </div>
                </div>
              </div>
              <div className={`col`}>
                <div className={`row justify-content-between`}>
                  <div className={`${styles.link} col-sm  mb-2`}>
                    <span className={`${styles.title}`}>聯繫方式</span>
                    <span>
                      <Link href={`mailto:eleganza@gmail.com`}>
                        <img src="/icons/icon-mail-white.svg" />{' '}
                        eleganza@gmail.com
                      </Link>
                    </span>
                    <span>
                      <img src="/icons/icon-phone-white.svg" />
                      +886229961786
                    </span>
                    <span>
                      <a href="">
                        <img src="/icons/icon-message-white.svg" />
                        表單聯繫我們
                      </a>
                    </span>
                  </div>
                  <div className={`${styles.link} col-sm  mb-2`}>
                    <span className={`${styles.title}`}>營業時間</span>
                    <span>週一至週五 13:00-22:00</span>
                    <span>週六 9:00-21:30</span>
                    <span>241 新北市三重區慈愛街18號</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className={`${styles.hr} mt-0`} />
          <div className="text-center">
            Copyright 2024© Eleganza Studio | All rights reserved
          </div>
        </div>
      </footer>
    </>
  )
}
