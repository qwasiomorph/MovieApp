import { Pagination } from "antd";

import PropTypes from "prop-types";

const PaginationWrap = ({ totalItems, changePage }) => {
  return (
    <div className="paginationWrap">
      <Pagination
        defaultPageSize={20}
        defaultCurrent={1}
        total={totalItems}
        onChange={changePage}
        pageSizeOptions={["20"]}
        hideOnSinglePage={true}
      />
    </div>
  );
};

PaginationWrap.defaultProps = {
  totalItems: 0,
  changePage: () => {},
};
PaginationWrap.propTypes = {
  totalItems: PropTypes.number,
  changePage: PropTypes.func,
};

export default PaginationWrap;
