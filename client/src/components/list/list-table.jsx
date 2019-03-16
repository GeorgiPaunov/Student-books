import React from "react";
import {Link} from "react-router-dom";

const ListTable = (props) => {
    function getDetails(id) {
        props.history.push(`/lists/details/${id}`);
    }

    return (
        <table align="center" className="list-table">
            <tbody>
            <tr>
                <th width="40%">Name of list</th>
                <th width="20%">Items</th>
                <th width="20%">Total price</th>
                <th width="20%">Delete</th>
            </tr>
            {
                props.lists.sort((a, b) => a.title.localeCompare(b.title))
                    .map(list => (
                        <tr key={list._id}>
                            <td>
                                <Link to={"#"} onClick={() => getDetails(list._id)}>{list.title}</Link>
                            </td>
                            <td>{list.studentBooks.length} pcs</td>
                            {
                                list.studentBooks.length
                                    ? <td>
                                        {list.studentBooks.reduce((acc, sb) => acc + sb.price, 0).toFixed(2)} lv.
                                      </td>
                                    : <td>0 lv.</td>
                            }
                            <td>
                                <button id="delete" onClick={() => props.deleteList(list._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        </table>
    );
};

export default ListTable;