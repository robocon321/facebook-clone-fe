import { NewsFeedContext } from "app/(main)/home/_providers/NewFeedsProvider";
import { NewsFeedContextType } from "app/(main)/home/_type/NewsFeedType";
import moment from "moment";
import { useContext } from "react";
import { ArticleResponse } from "types/responses/ArticleResponse";

type ArticleTypeProps = {
  article: ArticleResponse;
};

const HeaderArticle: React.FC<ArticleTypeProps> = (props) => {
  const { newsFeedEmotions } = useContext(
    NewsFeedContext
  ) as NewsFeedContextType;
  const { article } = props;
  const emotion = newsFeedEmotions.find(
    (item) => item.emotion_id == article.emotionId
  );

  return (
    <div>
      <div className="flex items-center space-x-2 p-2.5 px-4">
        <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10">
          <img
            src={
              article.account.profilePictureUrl
                ? article.account.profilePictureUrl
                : "https://random.imagecdn.app/500/200"
            }
            className="w-full h-full rounded-full"
            alt="dp"
          />
        </div>
        <div className="flex-grow flex flex-col">
          <div className="flex flex-wrap">
            <a className="hover:underline" href="#">
              <b>
                {article.account.lastName + " " + article.account.firstName}
              </b>
            </a>
            {emotion && (
              <div className="flex">
                <span className="mx-1">is feeling</span>
                <span className="mx-1">{emotion.text}</span>
                <img
                  className="mx-1 w-[25px] h-[25px]"
                  src={emotion.imageUrl}
                  alt="Not found"
                />
              </div>
            )}
            {article.checkin && (
              <div className="flex">
                <span className="mx-1">is living</span>
                <span className="mx-1 hover:underline">
                  <a href="#">
                    <b>
                      {article.checkin.address +
                        ", " +
                        article.checkin.city +
                        ", " +
                        article.checkin.country}
                    </b>
                  </a>
                </span>
              </div>
            )}
            {article.tags && (
              <>
                {article.tags.length > 0 && <span className="mx-1">with</span>}
                {article.tags.slice(0, 3).map((item, index) => {
                  return (
                    <div key={item.accountId}>
                      <a className="hover:underline" href="#">
                        <b>
                          {item.lastName +
                            " " +
                            item.firstName +
                            (index < 2 &&
                            article.tags &&
                            article.tags.length - 1 != index
                              ? ", "
                              : " ")}
                        </b>
                      </a>
                    </div>
                  );
                })}
                {article.tags.length > 3 && (
                  <li>
                    <span className="mx-1">and</span>
                    <a className="hover:underline" href="#">
                      <b> {article.tags.length - 3} other people</b>
                    </a>
                  </li>
                )}
              </>
            )}
          </div>
          <span className="text-xs font-thin text-gray-400">
            {moment(article.modTime).fromNow()}
          </span>
        </div>
        <div className="w-8 h-8">
          <button className="w-full h-full hover:bg-gray-100 rounded-full text-gray-400 focus:outline-none">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
      {article.text ? (
        <div className="mb-1">
          <p className="text-gray-700 max-h-10 truncate px-3 text-sm">
            {article.text}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderArticle;
