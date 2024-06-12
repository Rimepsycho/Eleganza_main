import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

export default function Index() {
  const { auth } = useAuth()
  const router = useRouter()

  // 部件展示&切換
  const section = ['琴身', '弦軸', '指板', '琴碼']
  const [violinSection, setViolinSection] = useState('琴身')
  const handleNextClick = () => {
    const currentIndex = section.indexOf(violinSection)
    const nextIndex = (currentIndex + 1) % section.length
    const nextSection = section[nextIndex]
    setViolinSection(nextSection)
  }
  const handlePrevClick = () => {
    const currentIndex = section.indexOf(violinSection)
    const prevIndex = currentIndex === 0 ? section.length - 1 : currentIndex - 1
    const prevSection = section[prevIndex]
    setViolinSection(prevSection)
  }

  // 要切換的部位文本
  const violinSections = [
    {
      title: '琴身',
      content: (
        <>
          <p>
            小提琴的琴身是其最主要的部分之一。它由約70多塊木片組合而成，包括琴頭、琴頸、指板和共鳴箱。琴身的結構非常重要，因為它直接影響著聲音的共鳴和音色。
          </p>
          <p>
            琴身通常由不同材質的木頭製成，例如拱形面板常選用質地稍軟的雪松木；側板、背板、漩渦狀的琴頭和琴頸則通常由質地較硬的楓木刻製而成。共鳴箱則起到放大琴弦振動聲音的作用。
          </p>
        </>
      ),
    },
    {
      title: '琴碼',
      content: (
        <>
          <p>
            琴碼是小提琴上的一組木製件，通常位於琴身頂部，用於支撐琴弦。它們不僅起到了支撐琴弦的作用，還會對琴的共鳴和音色產生影響。
          </p>
          <p>
            琴碼的材質和形狀對小提琴的聲音產生了重要影響。它們通常由特定的木材製成，並且被設計成特定的形狀，以確保琴弦能夠穩固地振動並產生理想的音色。
          </p>
        </>
      ),
    },
    {
      title: '弦軸',
      content: (
        <>
          <p>
            小提琴的弦軸是控制琴弦張緊度的部件。它們位於小提琴的尾部，通常由金屬製成。調節弦軸可以改變琴弦的音高，使其與其他樂器和音樂合奏。
          </p>
          <p>
            弦軸的設計和調節對於小提琴的音色和演奏感受至關重要。優質的弦軸能夠穩定地保持琴弦的張緊度，並且靈活地調整音高，使演奏更加準確和流暢。
          </p>
        </>
      ),
    },
    {
      title: '琴橋',
      content: (
        <>
          <p>
            小提琴的琴橋是位於琴身頂部的木製構件，用於支撐琴弦並傳遞琴弦的振動。它直接影響著琴弦的振動和共鳴，因此對小提琴的聲音和音色產生重要影響。
          </p>
          <p>
            琴橋通常由特定類型的木材製成，並且根據琴師的需求進行削減和調整。優質的琴橋能夠穩定地支撐琴弦，使其振動自然和和諧，並且能夠傳遞更多的共鳴。
          </p>
        </>
      ),
    },
    {
      title: '指板',
      content: (
        <>
          <p>
            小提琴的指板是位於琴頸上的平坦木製構件，用於支撐和調整琴弦的長度。它直接影響著音高的準確性和演奏的舒適度。
          </p>
          <p>
            指板通常由堅硬的木材製成，並且經過精密的加工和調整，以確保琴弦的長度和音高能夠準確地控制。優質的指板能夠提供舒適的演奏體驗，並且能夠支撐琴弦的張力，使其振動更加自然和和諧。
          </p>
        </>
      ),
    },
  ]
  const currentSection = violinSections.find(
    (section) => section.title === violinSection,
  )

  return (
    <>
      <ParallaxProvider>
        <div className="landing-page position-relative overflow-hidden">
          <div className="row">
            <div className="col-12 col-md-6">
              <Parallax speed={-180}>
                <div className="mb-5 logo ">
                  <h1>ELEGANZA</h1>
                  <h1>VIOLIN</h1>
                  <h1>STUDIO</h1>
                </div>
                <h3>阿爾扎小提琴工作室</h3>
              </Parallax>
            </div>
            <div className="col-6">
              <Parallax speed={15}>
                <img
                  className="position-absolute top-0 end-0"
                  src="/homepage/violin.png"
                />
              </Parallax>
            </div>
          </div>
        </div>
        <div className="intro d-flex justify-content-center align-items-center text-center">
          <Parallax speed={-10}>
            歡迎光臨阿爾扎小提琴工作室，
            <br />
            我們不僅提供世界知名品牌的小提琴及相關商品，
            <br />
            還擁有由教學起家的專業小提琴教師團隊。
            <br />
            從興趣班到專業升學，從入門到高階，
            <br />
            我們提供個別和團體課程，滿足各種需求。
            <br />
            自1997年成立以來，隨著業務擴展和人員增加，
            <br />
            我們不定期邀請國內外大師來舉辦大師班和講座，
            <br />
            以親民的價格讓更多人接觸古典音樂。
            <br />
          </Parallax>
        </div>
        <div className="latest">
          <div className="col-6">
            <h3 className="">最新訊息</h3>
          </div>
          <div className="latest-card">
            <div className="row">
              <div className="col-12 col-xl-6 mb-4">
                <div className="info d-flex obj-fit justify-content-between ">
                  <div className="ratio ratio-1x1 w-50">
                    <img src="/homepage/ex1.png" />
                  </div>
                  <div className="w-50 d-flex flex-column justify-content-between">
                    <div className="card-text">
                      <h5>義大利史特拉西瓦里1/2小提琴 2024花樣限定版</h5>
                      <p>
                        復刻經典款數據融合現代花樣的義到倆史各拉西瓦里 1/2
                        尺寸白色小提琴套裝甫進本工作室，既美麗又獨特。
                      </p>
                    </div>
                    <button className="flex-end">了解更多</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6 mb-4">
                <div className="info d-flex obj-fit justify-content-between ">
                  <div className="ratio ratio-1x1 w-50">
                    <img className="" src="/homepage/ex3.jpg" />
                  </div>
                  <div className="w-50 d-flex flex-column justify-content-between">
                    <div className="card-text">
                      <h5>2023黃詩雅小提琴獨奏會-至真盡美的剎那</h5>
                      <p>
                        本場音樂會將由青年小提琴家黃詩雅和鋼琴家朱泳達為大家帶來浪漫的音樂饗宴。上半場帶來義大利作曲家韋拉奇尼和塔替尼的經典曲目，下半場則是法國作曲家佛瑞耳的作品
                      </p>
                    </div>
                    <button className="flex-end">了解更多</button>
                  </div>
                </div>
              </div>
              {/* <div className="col-6">
                <div className="info d-flex obj-fit justify-content-between ">
                  <div className="ratio ratio-1x1 w-50">
                    <img className="" src="/homepage/ex2.jpg" />
                  </div>
                  <div className="w-50 d-flex flex-column justify-content-between">
                    <div>
                      <h5>【樂團片段大師班報名】鹿特丹愛樂管絃樂團：小提琴</h5>
                      <p>
                        「樂團片段」是交響樂團在招考團員時的必備項目，目的是讓評審評估演奏者的反應能力、音樂詮釋及對樂譜的熟悉度。成立於1918年的鹿特丹愛樂管絃樂團，素來以充滿張力的表演風格、備受讚譽的錄音作品，以及創新的觀眾互動手法而聞名，並因此在歐洲一流樂團中佔有一席之地。
                      </p>
                    </div>
                    <button className="flex-end">了解更多</button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="violin-section row">
          <div className="col-6 position-relative">
            <div className="d-none d-xl-block">
              <img className="obj-fit start-0 img" src="/homepage/violin.png" />
            </div>
          </div>
          <div className="col-12 col-xl-6 section-info d-flex flex-column justify-content-center">
            <h3 className="">如何選購您的第一把小提琴</h3>
            <div className="">
              <div>
                <div className="d-flex align-items-center mb-4">
                  <img
                    className="h-100 px-2"
                    src="/icons/icon-chevron-left.svg"
                    onClick={handlePrevClick}
                  />
                  <h2>{currentSection.title}</h2>
                  <img
                    className="h-100 px-2"
                    src="/icons/icon-chevron-right.svg"
                    onClick={handleNextClick}
                  />
                </div>
                <div>{currentSection.content}</div>
              </div>
              <Link href={'/article'}>
                <div className="article-link">查看專欄介紹</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="our-class">
          <div className="row ">
            <div className="col-12 col-sm-6">
              <div className="class sticky-xl-top">
                <h3>挑選適合自己的課程</h3>
                <p className="mb-5">
                  阿爾扎工作室以教學起家，
                  <br />
                  許多現職教師更是從創設起至今已在此服務超過25年，
                  <br />
                  適合學興趣與國內外中學至高等教育階段升學的學子們，
                  <br />
                  也適合小提琴職業演奏家繼續在此精進專業。
                  <br />
                  <Link href={`/course`}>
                    <button>查看課程</button>
                  </Link>
                </p>
              </div>
            </div>
            <div className="ol-12 col-xl-6">
              <div className="class-cate">
                <img className="obj-fit" src="/homepage/1.png" />
                <div>
                  <h4>國內外大師班：</h4>
                  <p>
                    常態課程包括大學音樂系內開設的課程如樂團片段、室內樂小班教學，還有不定期推出的新課程如影視配樂小提琴曲目選粹。
                  </p>
                </div>
              </div>
              <div className="class-cate">
                <img className="obj-fit" src="/homepage/2.png" />
                <div>
                  <h4>多樣主題團體班：</h4>
                  <p>
                    不定期邀請國內外小提琴名師在本工作室內外開設大師班、演講與演出，讓有一定程度的學子與廣大民眾都有近距離認識古典音樂、接受大師指導的機會。
                  </p>
                </div>
              </div>
              <div className="class-cate">
                <img className="obj-fit" src="/homepage/3.png" />
                <div>
                  <h4>初中高階個別課：</h4>
                  <p>
                    有古典與爵士小提琴可選擇，個別課教師會針對學生學習狀況指導。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .landing-page {
              height: 100vh;
              padding-top: 80px;
            }
            h1 {
              font-family: 'Playfair Display SC', serif;
              font-size: 120px;
              line-height: 80%;
            }
            .intro {
              font-size: 24px;
              height: 100vh;
              overflow-wrap: break-word;
              font-weight: 500;
            }
            .info {
              gap: 20px;
              & h3 {
                font-size: 24px;
                font-weight: 500;
              }
              border-radius: 8px;
              & p {
                font-size: 16px;
              }
            }
            button {
              color: var(--color-text-light);
              border: none;
              border-radius: 4px;
              padding: 8px 12px;
              background: var(--color-secondary-dark);
            }
            .latest {
              margin-bottom: 120px;
              & h3 {
                margin-bottom: 60px;
              }
              .latest-card {
                > div {
                  {/* gap: 60px; */}
                  & img {
                    border-radius: 8px;
                    object-fit: cover;
                  }
                }
                {/* overflow-x: auto;
                &::-webkit-scrollbar {
                  display: none;
                } */}
              }
            }
            .violin-section {
              margin-bottom: 80px;

              .img {
                height: 90vh;
                transform: scaleX(-1) rotate(-7deg);
                object-fit: contain;
              }

              .section-info {
                & h3 {
                  margin-bottom: 40px;
                }
                & h2 {
                  margin-bottom: 0px;
                }
                & p {
                  font-size: 18px;
                  line-height: 160%;
                }
                .article-link {
                  text-decoration: underline;
                }
                & img {
                  cursor: pointer;
                  user-select: none;
                }
              }
            }
            .obj-fit {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .class-cate {
              margin-bottom: 40px;
              img {
                border-radius: 8px;
                margin-bottom: 16px;
              }
            }

            .our-class {
              margin-bottom: 80px;

              & h3 {
                margin-bottom: 28px;
              }
              & p {
                font-size: 20px;
              }
              & button {
                margin-top: 28px;
              }
            }
            .class {
              top: 120px;
            }
            @media (max-width: 992px) {
              h3 {
                font-size: 20px;
              }
              .landing-page {
                & h1 {
                  font-size: 56px;
                }
                & h3 {
                  font-size: 20px;
                }
                & img {
                  display: none;
                }
              }
              .intro {
                font-size: 15px;
              }
              .latest-card{
               .card-text{
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  flex-direction: column;
                  -webkit-line-clamp: 3; 
                  height: 181px
               }
               & p{
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  flex-direction: column;
                  -webkit-line-clamp: 3; 
                  font-size: 12px;
               }
               h5{
                  font-size: 16px;
               }
              }
              .section-info {
                font-size: 16px;
                & h2 {
                  font-size: 20px;
                }
              }
              .our-class {
                & p {
                  font-size: 16px;
                }
                & h4 {
                  font-size: 18px;
                }
              }
            }
          `}
        </style>
      </ParallaxProvider>
    </>
  )
}
