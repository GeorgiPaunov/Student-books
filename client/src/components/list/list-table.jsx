import React from "react";
import {Link} from "react-router-dom";

const ListTable = ({ lists, deleteList, getDetails }) => {
    return (
        <table align="center">
            <tbody>
            <tr>
                <th width="40%">Name of list</th>
                <th width="20%">Items</th>
                <th width="20%">Total price</th>
                <th width="20%">Delete</th>
            </tr>
            {
                lists.sort((a, b) => a.title.localeCompare(b.title))
                    .map(list => (
                        <tr key={list._id}>
                            <td className="name">
                                <Link to={"#"} onClick={() => getDetails(list._id)}>{list.title}</Link>
                            </td>
                            <td className="middle">{list.studentBooks.length} pcs</td>
                            {
                                list.studentBooks.length
                                    ? <td className="middle">
                                        {list.studentBooks.reduce((acc, sb) => acc + sb.price, 0).toFixed(2)} lv.
                                      </td>
                                    : <td className="middle">0 lv.</td>
                            }
                            <td>
                                <button onClick={() => deleteList(list._id)}>Delete</button>
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