import React from "react";
import "./index.css";
import NewsCard from "./NewsCard";
const News = () => {
  const news = Array(9).fill({
    date: "Dec-7-2024",
    title: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam delectus
        fugit officiis corrupti velit nisi perferendis amet odit sint esse,
        repudiandae aliquam, rerum tempora quaerat. Sapiente repellendus ipsam
        rem ut neque unde distinctio tenetur maxime dolorum, porro cumque
        tempore totam temporibus labore. Commodi nostrum eum quae consequatur
        quo esse debitis!
      </>
    ),
    content: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        accusantium voluptatem illum rerum ab vitae unde. Fugit velit harum illo
        quo voluptate aperiam nesciunt suscipit officiis dolorem pariatur saepe
        hic, eius ullam exercitationem nam facere repellendus tempore veritatis
        iure provident ea culpa totam! Exercitationem nobis beatae sapiente
        reiciendis fugiat! Praesentium, amet vitae laboriosam saepe, quis
        facilis possimus, suscipit dignissimos minima illo omnis rerum pariatur
        quod? Excepturi ad impedit porro necessitatibus obcaecati dolore quas
        dolorum quidem, reiciendis facere quaerat facilis. Provident cumque,
        voluptatibus quae corrupti quibusdam animi? Nemo eum quia tenetur cum
        molestiae natus neque odio perferendis quisquam quibusdam provident sit
        dolore sequi illum expedita quas asperiores veritatis qui eos
        consequatur suscipit, rerum eligendi. Blanditiis ea maiores id suscipit
        laudantium praesentium modi doloremque quaerat dolores cupiditate!
        Debitis totam natus dicta facere repudiandae placeat atque! Nobis sint
        necessitatibus numquam placeat, eligendi nulla quis ratione voluptas
        eaque voluptatibus! Quas, sequi voluptatum. Tenetur cum similique quidem
        voluptas ab. Doloremque mollitia rerum dolores a rem iure cupiditate,
        repudiandae animi amet temporibus voluptatum at, recusandae nulla fugit
        nobis excepturi placeat reprehenderit? Vel nam tempore corporis?
        Praesentium, provident. Autem accusantium expedita aut tempore
        dignissimos praesentium repudiandae natus iusto quaerat, perferendis
        accusamus repellat illum maiores ad nisi nemo, incidunt nobis. Tenetur
        eligendi nesciunt enim, omnis consequatur quasi vero. Numquam, fugit
        ullam quisquam molestias doloremque velit similique a nihil labore
        officia veniam recusandae fugiat. Repellendus doloremque nemo quasi
        molestias, dolor error sit optio quos, dolorum modi delectus incidunt
        est earum voluptatem expedita, atque minus. Expedita adipisci, quo
        reprehenderit tempore dolores minus ad voluptatem maiores voluptatum
        officia labore, eius similique velit commodi, impedit quisquam ipsa
        consectetur atque aliquam blanditiis facilis placeat illo! Labore
        temporibus ipsum nulla quisquam hic inventore totam tenetur suscipit
        error dicta commodi excepturi molestiae eligendi odio ducimus reiciendis
        at adipisci, deleniti illum veritatis recusandae reprehenderit
        consectetur, sapiente quo. Sapiente neque voluptatibus explicabo iure
        voluptate nulla ab cum, optio asperiores. Exercitationem dolores, quidem
        ipsam, distinctio iure suscipit hic obcaecati nihil eveniet quisquam
        earum qui molestiae repudiandae vel officia voluptate labore minus
        accusantium cumque. Culpa nihil non beatae inventore officiis repellat
        quidem quos vitae impedit accusamus. Molestiae minima deserunt
        reprehenderit quis sapiente distinctio quam facere quae magni magnam
        eaque esse aliquam, quia, facilis autem, expedita earum? Necessitatibus,
        quasi quas aperiam dolorum nulla ratione laboriosam voluptatem minima
        nesciunt tempore omnis facilis recusandae ea ut ipsa quo. Laboriosam,
        sint facilis voluptate delectus, doloremque aliquam pariatur facere est
        nobis sit quasi fugit harum sunt adipisci quidem ipsam cumque quia minus
        qui distinctio? Ea, officia repellendus in numquam nisi doloremque totam
        animi et rerum veritatis ab eum? Voluptas ex iste ullam ab placeat optio
        odio animi eaque molestias corrupti! Illo aut temporibus eum alias
        repudiandae commodi. Ullam tempore illum animi molestias? Adipisci,
        iusto? Cum ea dolorum aliquam hic nemo repudiandae quas. Facere,
        reiciendis quas fuga necessitatibus, illum voluptatibus ut cupiditate
        quis porro, corporis doloribus commodi eligendi. Similique possimus
        ducimus modi tempore deleniti voluptatibus vero perferendis debitis
        aspernatur impedit corrupti ipsum ab fugiat, accusantium odit explicabo
        laudantium suscipit excepturi provident consequuntur quam qui. Mollitia.
      </>
    ),
    link: "/",
  });
  return (
    <div className="_news">
      <div className="news-grid">
        {news.map((article) => (
          <NewsCard article={article} />
        ))}
      </div>
    </div>
  );
};

export default News;
