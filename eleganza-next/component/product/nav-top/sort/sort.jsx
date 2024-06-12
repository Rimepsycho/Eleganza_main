export default function Sort({ selectedOption, handleOptionClick }) {
  return (
    <>
      <span
        className={`ms-1`}
        type="button"
        id="dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedOption}
        <img className="mb-1" src="/icons/icon-chevron-down.svg" alt="" />
      </span>
      <ul className="dropdown-menu" aria-labelledby="dropdown">
      <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleOptionClick('預設排序')}
          >
            預設排序
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleOptionClick('價格由高至低')}
          >
            價格由高至低
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleOptionClick('價格由低至高')}
          >
            價格由低至高
          </a>
        </li>
      </ul>
    </>
  )
}
