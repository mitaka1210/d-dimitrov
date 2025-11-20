import LikeHeart from "../likeHeart/likeHeart";
import DisLikeheart from "../dislikeHeart/disLikeHTML";
import {useDispatch, useSelector} from "react-redux";
import {useRouter, useSearchParams} from "next/navigation";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {
    useGetArticleLikesQuery,
    useLikeArticleMutation
} from "../../store/api/likesSlice";
import {fetchArticles} from "../../store/getArticles/getArticlesSlice";
import LoaderHTML from "../loader/LoaderHTML";
import SocialShare from "../Helper-components/socialShare/socialShare";

const ReadHtml = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useTranslation();
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [articleTitle, setArticleTitle] = useState("");
    const [sectionArr, setSectionArr] = useState([]);
    const [progress, setProgress] = useState(0);
    const [showNext, setShowNext] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [likeArticle] = useLikeArticleMutation();
    let a;

    useEffect(() => {
        const queryId = searchParams.get("id");
        if (queryId) {
            setId(queryId);
        }
    }, [searchParams]);

    useEffect(() => {
        if (id) {
            dispatch(fetchArticles());
        }
    }, [dispatch, id]);

    const { data, isLoading } = useGetArticleLikesQuery(id, { skip: !id, refetchOnMountOrArgChange: true,});

    useEffect(() => {
        if (data) {
            setLikeCount(Number(data.likes) || 0);
            setDislikeCount(Number(data.dislikes) || 0);
        }
    }, [data]);

    const articlesInfo = useSelector((state) => state.articles.data);
    const status = useSelector((state) => state.articles.status);

    useEffect(() => {
        if (!id || status !== "succeeded" || articlesInfo.length === 0) return;

        const sectionId = Number(id);
        const section = articlesInfo.find((s) => s.id === sectionId);

        if (section) {
            setArticleTitle(section.title);
            setSectionArr(section.sections);
            setLoading(false);
            a = document.getElementsByClassName('read-sections-text');
        }
    }, [status, articlesInfo, id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progressValue = (scrollTop / scrollHeight) * 100;
            setProgress(progressValue);
            setShowNext(progressValue > 90);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [id]);
    const goBack = () => {
        router.push("/cardAquariums");
    };
    const formattedContent = (text) => {
        return text.split("\r\n").map((line, index) => {
            if (line.startsWith("✅") || line.startsWith("❌")) {
                return <li key={index}>{line}</li>;
            } else if (line.trim() !== "") {
                return <p key={index}>{line}</p>;
            }
            return null;
        });
    };
    const handleLike = async () => {
        if (isLiked || isDisliked) return;
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);

        try {
            await likeArticle({ articleId: id, type: "like" }).unwrap();
        } catch (err) {
            console.error("🔴 Like failed:", err);
            setLikeCount((prev) => prev - 1);
            setIsLiked(false);
        }
    };

    const handleDislike = async () => {
        if (isLiked || isDisliked) return;
        setIsDisliked(true);
        setDislikeCount((prev) => prev + 1);

        try {
            await likeArticle({ articleId: id, type: "dislike" }).unwrap();
        } catch (err) {
            console.error("🔴 Dislike failed:", err);
            setDislikeCount((prev) => prev - 1);
            setIsDisliked(false);
        }
    };

    if (!id) return null;
    if (loading || isLoading) return <LoaderHTML />;
    return (
        <div className="read" style={{ background: "linear-gradient(to bottom, #006994, #003f5c)", minHeight: "100vh", padding: "20px" }}>
            <div className="progress-container" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "4px", background: "#ddd", zIndex: 1000 }}>
                <div className="progress-bar" style={{ height: "4px", background: "#fc2e5a", width: `${progress}%`, transition: "width 0.3s ease-in-out" }}></div>
            </div>
            <div className="read-back-btn">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full padding-10" onClick={goBack}>
                    {t("back")}
                </button>
            </div>
            <section>
           <div className="share-menu-responsive">
             <div>
                 <h4 className="read-title text-align-center">{articleTitle}</h4>
                 <hr className="add-line-after-header" />
                 <div className="social-share-component-styles">
                     <SocialShare data={articleTitle} />
                 </div>
                 <div className="read-sections">
                     {sectionArr.map((section, index) => (
                         <div key={index} className="read-section">
                             <h5 className="read-section-title text-align-center">{index + 1}.{section.title}</h5>
                             {/*<p className="read-section-text">{section.content}</p>*/}
                             <ul>{formattedContent(section.content)}</ul>
                         </div>
                     ))}
                 </div>
             </div>
           </div>
            </section>
            <section>
                <div className="likeDislikeBtn flex-horizontal-container justify-content-center">
                    <button className="removeBgrBorder" onClick={handleLike} disabled={isLiked || isDisliked}>
                        <LikeHeart likeIt={isLiked}/>
                        <p>{likeCount}</p>
                    </button>
                    <button className="removeBgrBorder" onClick={handleDislike} disabled={isLiked || isDisliked}>
                        <DisLikeheart />
                        <p className="dislike-number">{dislikeCount}</p>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ReadHtml;
