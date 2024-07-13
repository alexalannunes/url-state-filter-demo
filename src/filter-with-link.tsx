import { useSearchParams, Link, useLocation } from "react-router-dom";
import "./App.css";
import { HTMLProps } from "react";
import { categories } from "./data";
import { serializeParams } from "./utils";

interface RadioProps extends HTMLProps<HTMLInputElement> {
  filterKey: string;
  label: string;
  value: string;
}

function Radio({ name, filterKey, value, label }: RadioProps) {
  const [params] = useSearchParams();

  const filterKeyValue = params.get(filterKey);

  return (
    <label htmlFor={value}>
      <input
        id={value}
        value={filterKeyValue || ""}
        checked={value === filterKeyValue}
        onChange={() => {}}
        type="radio"
        name={name}
      />
      {label}
    </label>
  );
}

function Checkbox({ name, filterKey, value, label }: RadioProps) {
  const [params] = useSearchParams();

  const filterKeyValue = params.get(filterKey);

  const values = filterKeyValue?.split("-") || [];

  const isChecked = values.includes(decodeURIComponent(value));

  return (
    <label htmlFor={value}>
      <input
        id={value}
        value={filterKeyValue || ""}
        checked={isChecked}
        onChange={() => {}}
        type="checkbox"
        name={name}
      />
      {label}
    </label>
  );
}

function LinkFilter() {
  const [searchParams] = useSearchParams(location.search);
  const { pathname } = useLocation();

  const result = serializeParams(searchParams);

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
                      const url = new URLSearchParams(location.search);

                      url.set(cat.key, op.value);

                      return (
                        <div
                          key={op.value}
                          className="category-filter-option-item"
                        >
                          <Link
                            to={{
                              pathname: "",
                              search: url.toString(),
                            }}
                          >
                            <Radio
                              value={op.value}
                              filterKey={cat.key}
                              label={op.label}
                            />
                          </Link>
                        </div>
                      );
                    })
                  : cat.options.map((op) => {
                      const existKey = searchParams.get(cat.key);

                      let string = "";
                      let url = new URLSearchParams();

                      if (existKey) {
                        const values = existKey?.split("-") || [];

                        const newValues = values?.includes(op.value)
                          ? values.filter((c) => c !== op.value)
                          : [...values, op.value];

                        string = newValues.join("-");
                        url = new URLSearchParams(location.search);
                        url.set(cat.key, string);
                        if (!string) url.delete(cat.key);
                      } else {
                        const newUrl = new URLSearchParams(location.search);
                        newUrl.append(cat.key, op.value);
                        url = newUrl;
                      }

                      return (
                        <div
                          key={op.value}
                          className="category-filter-option-item"
                        >
                          <Link
                            to={{
                              pathname: pathname,
                              search: url.toString(),
                            }}
                          >
                            <Checkbox
                              filterKey={cat.key}
                              label={op.label}
                              value={op.value}
                            />
                          </Link>
                        </div>
                      );
                    })}
              </div>
            </div>
          );
        })}
      </aside>
      <main>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </main>
    </div>
  );
}

export { LinkFilter };
