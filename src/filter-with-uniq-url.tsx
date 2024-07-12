import { useSearchParams } from "react-router-dom";
import "./App.css";
import { categories } from "./data";

const paramsToB64 = (params: object) => {
  // install b64 to encode
  return window.btoa(JSON.stringify(params));
};

const b64ToParams = (data: string) => {
  // install b64 to decode
  return JSON.parse(decodeURIComponent(window.atob(data))) as object;
};

function UrlStringFilter() {
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const handleChangeRadio = (keyFilter: string, value: string) => {
    const currentState = searchParams.get("filter");
    // 'e30=' ===> '{}' in base64
    const current = b64ToParams(currentState || "e30=");

    const newUrlState = {
      ...current,
      [keyFilter]: value,
    };
    const urlStateString = paramsToB64(newUrlState);
    setSearchParams({ filter: urlStateString });
  };

  const handleChangeCheckbox = (keyFilter: string, value: string) => {
    const currentState = searchParams.get("filter");
    const current = b64ToParams(currentState || "e30=");

    const oldState = ((current as Record<string, string>)[keyFilter] ||
      []) as string[];

    if (oldState) {
      const newState = {
        ...current,
        [keyFilter]: oldState,
      };

      if (oldState.includes(value)) {
        newState[keyFilter] = newState[keyFilter].filter((p) => p !== value);
      } else {
        newState[keyFilter] = newState[keyFilter].concat(value);
      }

      if (!newState[keyFilter].length) {
        delete newState[keyFilter];
      }

      const urlStateString = paramsToB64(newState);
      setSearchParams({ filter: urlStateString });
      return;
    }
    const urlStateString = paramsToB64({ [keyFilter]: value });

    setSearchParams({ filter: urlStateString });
  };

  return (
    <div className="main">
      <aside>
        {categories.map((cat) => {
          return (
            <div key={cat.key} className="category-filter">
              <h5>{cat.label}</h5>

              <div className="category-filter-options">
                {cat.type === "radio"
                  ? cat.options.map((op) => {
                      const currentState = searchParams.get("filter");
                      const fullState = b64ToParams(
                        currentState || "e30="
                      ) as Record<string, string>;

                      const value = fullState[cat.key];

                      return (
                        <div
                          key={op.value}
                          className="category-filter-option-item"
                        >
                          <label htmlFor={op.value}>
                            <input
                              id={op.value}
                              type="radio"
                              value={op.value}
                              checked={op.value === value}
                              name={`${cat.key}`}
                              onChange={() =>
                                handleChangeRadio(cat.key, op.value)
                              }
                            />
                            {op.label}
                          </label>
                        </div>
                      );
                    })
                  : cat.options.map((op) => {
                      const currentState = searchParams.get("filter");
                      const fullState = b64ToParams(
                        currentState || "e30="
                      ) as Record<string, string>;

                      const value = (fullState[cat.key] || []) as string[];

                      return (
                        <div
                          key={op.value}
                          className="category-filter-option-item"
                        >
                          <label htmlFor={op.value}>
                            <input
                              id={op.value}
                              type="checkbox"
                              value={op.value}
                              checked={value.includes(op.value)}
                              name={`${cat.key}`}
                              onChange={() =>
                                handleChangeCheckbox(cat.key, op.value)
                              }
                            />
                            {op.label}
                          </label>
                        </div>
                      );
                    })}
              </div>
            </div>
          );
        })}
      </aside>
      <main>
        <pre>
          {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
        </pre>
      </main>
    </div>
  );
}

export { UrlStringFilter };
