const AddCard = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className="py-4">
      <button className="primary-button">Add New Product</button>
    </div>
  );
};
export default AddCard;
