import Article from "app/(main)/home/_components/article/single-article";
import { NewsFeedContext } from "app/(main)/home/_providers/NewFeedsProvider";
import React, { useContext } from "react";
import { NewsFeedContextType } from "app/(main)/home/_type/NewsFeedType";

type TArticleView = "gridView" | "listView";

interface IProps {
  articlesView?: TArticleView;
}

const ArticleContainer: React.FC<IProps> = (props) => {
  const { articlesView } = props;
  const { newsFeedData } = useContext(NewsFeedContext) as NewsFeedContextType;
  return (
    <div className="mt-4 w-full h-full">
      <div
        className={`grid ${
          articlesView === "gridView" ? "grid-cols-2" : "grid-cols-1"
        } gap-2`}
      >
        {newsFeedData.articles.length ? (
          newsFeedData.articles.map((article, idx) => (
            <Article key={article.articleId} article={article} />
          ))
        ) : (
          <p>No articles yet!</p>
        )}
      </div>
    </div>
  );
};

export default ArticleContainer;
