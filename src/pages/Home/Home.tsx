import CreatePost from "../../components/Post/CreatePost";

const HomePage = () => {
  return (
    <div className="container py-6 mx-auto">
      <CreatePost />
    </div>
  );
};

export default HomePage;

//<div-wrapper-card> // border, size, padding etc.
//    <flex> // organize child elements
//        <post-form>
//            <input/>
//            <footer/button>/action-bar/>
//        </post-form>
//    </flex>
//</div>
