const AllCategoriesButton = ({ setSelectedCategory }) => {
  return (
    <button
      className="btn all__categories btn-sm btn-outline-dark"
      onClick={() => setSelectedCategory("")}
    >
      Všechny
    </button>
  );
};

export default AllCategoriesButton;
