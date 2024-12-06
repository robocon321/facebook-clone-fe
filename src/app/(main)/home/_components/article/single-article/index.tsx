import React from "react";
import { ArticleResponse } from "types/responses/ArticleResponse";
import BodyArticle from "./BodyArticle";
import FooterArticle from "./FooterArticle";
import HeaderArticle from "./HeaderArticle";

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
