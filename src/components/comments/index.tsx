import dynamic from "next/dynamic";

const GiscusComponent = dynamic(() => import("@/components/comments/Giscus"), {
  ssr: false,
});

const Comments = ({ mapping }) => {
  return (
    <div id="comment">
      <GiscusComponent mapping={mapping} />
    </div>
  );
};

export default Comments;
