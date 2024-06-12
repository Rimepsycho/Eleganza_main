import React from 'react'
import styles from './contactus.module.scss'

export default function ContactUsForm() {
  return (
    <>
        <div className={styles.overlaybg}  >
            <div className={styles.popupwindow} >
                <a href="">
                <img src="/icons/icon-x.svg" alt="" />
                </a>
                <div className={styles.formwrap} >
                <div className={styles.logo} >
                    {" "}
                    <a href="">ELEGANZA</a>
                </div>
                <div className={styles.formwraps} >
                    <div className={styles.contactus} >
                    <p>
                        聯繫我們
                        <br />
                        Contact Us
                    </p>
                    </div>
                    <div className= {styles.form} >
                    <p className={styles.formkey} >您的聯絡資訊</p>
                    <input className={styles.formvalue} type="text" />
                    <input className={styles.formvalue} type="text" />
                    <input className={styles.formvalue} type="text" />
                    </div>
                </div>
                <div className={styles.formwraps} >
                    <div className={styles.form}>
                    <p className={styles.formkey}>諮詢細項</p>
                    <select className={styles.formvalue} placeholder="請選擇您要諮詢的項目">
                        <option value="option1">課程諮詢</option>
                        <option value="option2">買琴諮詢</option>
                        <option value="option3">其他合作</option>
                    </select>
                    <textarea
                        className={styles.formvalue}
                        rows={5}
                        cols={50}
                        defaultValue={"請在此留下您要諮詢的詳細內容，我們會儘快和您聯繫。"}
                    />
                    </div>
                </div>
                <div className={styles.mbtn} >
                    <a href="">送出</a>
                </div>
                </div>
            </div>
            </div>

    </>
  )
}