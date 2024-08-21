import React from "react";
import BodyArticle from "./BodyArticle";
import FooterArticle from "./FooterArticle";
import HeaderArticle from "./HeaderArticle";
import { ArticleResponse } from "types/responses/ArticleResponse";

type ArticleTypeProps = {
  article: ArticleResponse;
};

const Article: React.FC<ArticleTypeProps> = (props) => {
  const { article } = props;
  return (
    <div className="w-full shadow h-auto bg-white rounded-md">
      <HeaderArticle article={article} />
      <BodyArticle article={article} />
      <FooterArticle article={article} />
    </div>
  );
};

export default Article;
