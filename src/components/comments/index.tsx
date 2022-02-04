import dynamic from "next/dynamic";
import { ReactElement } from "react";

type Props = { mapping: string };

const GiscusComponent = dynamic(() => import("@/components/comments/Giscus"), {
  ssr: false,
});

const Comments = ({ mapping }: Props): ReactElement => {
  return (
    <div id="comment">
      <GiscusComponent mapping={mapping} />
    </div>
  );
};

export default Comments;
