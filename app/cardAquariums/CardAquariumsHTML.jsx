'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './cardAquariums.scss';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../assets/images/image';
import { fetchArticles } from '../../store/getArticles/getArticlesSlice';
import {t} from "i18next";
import LoaderHTML from "../loader/LoaderHTML";

const CardAquariumsHTML = () => {
 const dispatch = useDispatch();
setTimeout(() => {
 // const { t } = useTranslation();
},2000)
 const router = useRouter();
 const status = useSelector((state) => state.articles.status);
 useEffect(() => {
  if (status === 'idle') {
   dispatch(fetchArticles());
  }
 }, [status, dispatch]);
 const loading = useSelector((state) => state.articles);
 const articlesInfo = useSelector((state) => state.articles.data);
 let img = images;
 if (articlesInfo.length === 0 && status === 'failed') {
  router.push('/');
 }
 const backToHome = () => {
    router.push('/');
 }
 const handleClick = (id) => {
  // const {id} = router.query;
  // Проверете дали използвате низове за query параметрите
  router.push('/ReadArticles' + `/?id=${id}`);
 };
 const sections = [
  {
   backgroundImage: `${img[8].url.src}`,
   text: 'Immerse yourself in a seamless experience where every touchpoint anticipates your needs. Description one.',
   date: '2024-12-13',
  },
 ];
 return (
  <Suspense fallback={<div>Loading...</div>}>
   {
    loading.isLoading ?
        <LoaderHTML />:
     <div>
      <section
       className="flex flex-col  justify-center items-center  add-scroll-aquarium-page">
       <div
        className="prose text-gray-500 prose-sm prose-headings:font-normal prose-headings:text-xl mobile-devices-styles">
        <div className="flex-vertical-container-raw justify-center align-items-center">
         <h4 className="text-align-center color-white">"Подводна магия у дома: Всичко за аквариуми – от старта до тайните на професионалистите"</h4>
         <p className="text-balance color-white">"Живот под стъклото: Тайният свят на аквариумите, който ще ви плени"</p>
        </div>
       </div>

       <div className="flex flex-wrap mx-auto mt-6 border-t pt-12">
        {
         articlesInfo.length > 0 ?
          (

           articlesInfo.map((article, index) => {
            if (article.status === false) {
             backToHome();
            }
            return (
             <div key={index}>
              {article.status === true && articlesInfo.length > 0 ?
               <div className="blog-card margin-15" key={index}>
                <div className="meta">
                 <div className="photo" style={{ backgroundImage: `url(${img[7].url.src})` }}
                 ></div>
                 <ul className="details">
                  <li className="author">
                   <a>{article.title.substring(0, 60)}....</a></li>
                  <li className="date">{article.create_article_date}</li>
                  <li className="tags">
                   <ul>
                    <li className="support-fish-aquarium">{t('Support')}</li>,
                    <li className="support-fish">{t('Fish')}</li>,
                    <li className="support-aquarium">{t('Aquarium')}</li>
                   </ul>
                  </li>
                 </ul>
                </div>
                <div className="description">
                 <h1>{article.title}</h1>
                 <h5>Вашето ръководство за създаване и поддръжка на здрав и
                  красив
                  аквариум.</h5>
                 {
                  index === 0 ?
                      <span>Аквариумите не са просто декорация, а живи екосистеми, които
                  внасят спокойствие и красота в дома. Те обаче изискват знания,
                  внимание и грижи. Ако мечтаете за аквариум, но не знаете
                  откъде
                  да започнете, тази статия ще ви даде основни насоки.</span>
                        :
                      <span>{article.sections[index - 1].content.substring(0,220)}...</span>
                 }
                 <div className="flex-horizontal-container-raw justify-end">
                  <button onClick={() => handleClick(article.id)}>
                   <span className="read-more">
                    <a>{t('seeMore')}</a>
                   </span>
                  </button>
                 </div>
                </div>
               </div> :
               <div className="status-article-false"></div>
              }
             </div>
            );
           })
          ) : null
        }

       </div>
      </section>

     </div>

   }
  </Suspense>
 );
};

export default CardAquariumsHTML;
