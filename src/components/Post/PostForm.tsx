const Form = () => {
  return (
    <div className="flex">
      <div className="text-start">
        <label className="form-label" htmlFor="post-input">
          New Post
        </label>
        <textarea id="post-input" className="form-control" />
      </div>
      <div className="d-flex mt-2">
        <button className="btn btn-primary ms-auto">Post</button>
      </div>
    </div>
  );
};

export default Form;
