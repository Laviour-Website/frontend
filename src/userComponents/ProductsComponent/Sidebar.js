import { useState } from "react";
function Sidebar({
  onChange,
  onPriceChange,
  price,
  clearState,
  size,
  onSizeChange,
}) {
  return (
    <div className="w-[20%] border-b-2 pb-4  h-[100%] border-r-2 hidden md:block">
      <div className="flex justify-between py-3 px-2 ">
        <h3 className="text-lg font-extrabold">FILTERS</h3>
        <button
          className="text-sm text-[#db1d8f] font-bold"
          onClick={clearState}
        >
          CLEAR ALL
        </button>
      </div>
      <hr />
      <h3 className="mb-2 font-bold text-center p-2 bg-[#f8c8d0] ">SIZES</h3>
      <div className="flex  border-b-3">
        <div className="flex flex-wrap">
          <div className="flex items-center">
            <input
              type="radio"
              value="XS"
              name="size"
              className="mr-2 h-4 w-4 ml-4"
              onChange={onSizeChange}
              checked={size === "XS"}
              id="XS"
            ></input>
            <label for="XS">XS</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="S"
              name="size"
              className="mr-2 h-4 w-4 ml-4"
              onChange={onSizeChange}
              checked={size === "S"}
              id="S"
            ></input>
            <label for="S">S</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="M"
              name="size"
              className="mr-2 h-4 w-4 ml-4"
              checked={size === "M"}
              onChange={onSizeChange}
              id="M"
            ></input>
            <label for="M">M</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="L"
              name="size"
              className="mr-2 h-4 w-4 ml-4"
              onChange={onSizeChange}
              checked={size === "L"}
              id="L"
            ></input>
            <label for="L">L</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="XL"
              name="size"
              className="mr-2 h-4 w-4 ml-4"
              onChange={onSizeChange}
              checked={size === "XL"}
              id="XL"
            ></input>
            <label for="XL">XL</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="XXL"
              name="size"
              className="mr-2 h-4 w-4 ml-4"
              checked={size === "XXL"}
              onChange={onSizeChange}
              id="XXL"
            ></input>
            <label for="XXL">XXL</label>
          </div>
        </div>
      </div>
      <div className="py-3">
        <h3 className="mb-2 font-bold  text-center p-2 bg-[#f8c8d0]">PRICE</h3>
        <div className="ml-2">
          <div className="mx-2 flex items-center">
            <input
              id="0 to 500"
              type="radio"
              name="price"
              onChange={onPriceChange}
              checked={price === "0 TO 500"}
              className="mr-2 h-4 w-4"
              value="0 TO 500"
            />
            <label for="0 to 500"> Rs. 0 to Rs. 500</label>
          </div>
          <div className="mx-2 flex items-center">
            <input
              id="500 TO 1000"
              type="radio"
              name="price"
              onChange={onPriceChange}
              checked={price === "500 TO 1000"}
              value="500 TO 1000"
              className="mr-2 h-4 w-4"
            />
            <label for="500 TO 1000">Rs. 500 to Rs. 1000</label>
          </div>
          <div className="mx-2 flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="radio"
              name="price"
              onChange={onPriceChange}
              checked={price === "1000 TO 2000"}
              value="1000 TO 2000"
              id="1000 TO 2000"
            />{" "}
            <label for="1000 TO 2000"> Rs. 1000 to Rs. 2000</label>
          </div>
          <div className="mx-2 flex items-center">
            <input
              id="2000 TO 5000"
              className="mr-2 h-4 w-4"
              name="price"
              onChange={onPriceChange}
              checked={price === "2000 TO 5000"}
              type="radio"
              value="2000 TO 5000"
            />
            <label for="2000 TO 5000"> Rs. 2000 to Rs. 5000</label>
          </div>
          <div className="mx-2 flex items-center">
            <input
              id="5000 TO 10000"
              className="mr-2 h-4 w-4"
              type="radio"
              name="price"
              onChange={onPriceChange}
              checked={price === "5000 TO 10000"}
              value="5000 TO 10000"
            />
            <label for="5000 TO 10000"> Rs. 5000 to Rs. 10000</label>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="mb-2 font-bold text-center p-2 bg-[#f8c8d0]">COLORS</h3>
        <div className="ml-2">
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="black"
              id="black"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#000]"></div>
            <label className="mx-1" for="black">
              BLACK
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="grey"
              id="grey"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#808080]"></div>
            <label className="mx-1" for="grey">
              Grey
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="grey"
              id="light-grey"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#bbc2cc]"></div>
            <label className="mx-1" for="light-grey">
              Light Grey
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="white"
              id="white"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#fff]"></div>
            <label className="mx-1" for="white">
              White
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="brown"
              id="dark-brown"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#5d4037]"></div>
            <label className="mx-1" for="dark-brown">
              Dark Brown
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="brown"
              id="brown"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#964b00]"></div>
            <label className="mx-1" for="brown">
              Brown
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="brown"
              id="light-brown"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#b5651d]"></div>
            <label className="mx-1" for="light-brown">
              Light Brown
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="blue"
              id="navy-blue"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#00008b]"></div>
            <label className="mx-1" for="navy-blue">
              Navy Blue
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="blue"
              id="blue"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#0000ff]"></div>
            <label className="mx-1" for="blue">
              Blue
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="light-blue"
              id="light-blue"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#3cdfff]"></div>
            <label className="mx-1" for="light-blue">
              Light Blue
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="light-blue"
              id="cyan"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#01ffff]"></div>
            <label className="mx-1" for="cyan">
              Cyan
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="light-blue"
              id="baby-blue"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#87cdee]"></div>
            <label className="mx-1" for="baby-blue">
              Baby Blue
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="purple"
              id="violet"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#4b0082]"></div>
            <label className="mx-1" for="violet">
              Violet
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="purple"
              id="purple"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#8a00c2]"></div>
            <label className="mx-1" for="purple">
              Purple
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="pink"
              id="lavendar"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#d7b4f3]"></div>
            <label className="mx-1" for="lavendar">
              Lavendar
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="pink"
              id="pink"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#fe019a]"></div>
            <label className="mx-1" for="pink">
              Pink
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="pink"
              id="magenta"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#ff00ff]"></div>
            <label className="mx-1" for="magenta">
              Magenta
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="pink"
              id="baby-pink"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#f8c8dc]"></div>
            <label className="mx-1" for="baby-pink">
              Baby Pink
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="red"
              id="maroon"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#800000]"></div>
            <label className="mx-1" for="maroon">
              Maroon
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="red"
              id="red"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#dd1717]"></div>
            <label className="mx-1" for="red">
              Red
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="red"
              id="light-red"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#ff7276]"></div>
            <label className="mx-1" for="light-red">
              Light Red
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="dark-green"
              id="olive"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#808000]"></div>
            <label className="mx-1" for="olive">
              Olive
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="dark-green"
              id="dark-green"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#2e8b57]"></div>
            <label className="mx-1" for="dark-green">
              Dark Green
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="green"
              id="green"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#3cb043]"></div>
            <label className="mx-1" for="green">
              Green
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="green"
              id="neon-green"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#39ff14]"></div>
            <label className="mx-1" for="neon-green">
              Neon Green
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="green"
              id="light-green"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#90ee90]"></div>
            <label className="mx-1" for="light-green">
              Light Green
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="yellow"
              id="lime-green"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#c7ea46]"></div>
            <label className="mx-1" for="lime-green">
              Lime Green
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="yellow"
              id="mustard"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#e1ad01]"></div>
            <label className="mx-1" for="mustard">
              Mustard
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="yellow"
              id="yellow"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#ffec19]"></div>
            <label className="mx-1" for="yellow">
              Yellow
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="yellow"
              id="light-yellow"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#ffffa7]"></div>
            <label className="mx-1" for="light-yellow">
              Light Yellow
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="orange"
              id="orange"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#ed7014]"></div>
            <label className="mx-1" for="orange">
              Orange
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="orange"
              id="light-orange"
              onChange={onChange}
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#ffb74d]"></div>
            <label className="mx-1" for="light-orange">
              Light Orange
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="peach"
              onChange={onChange}
              id="mauve"
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#bd9596]"></div>
            <label className="mx-1" for="mauve">
              Mauve
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="peach"
              onChange={onChange}
              id="peach"
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#ffcba4]"></div>
            <label className="mx-1" for="peach">
              Peach
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="peach"
              onChange={onChange}
              id="nude"
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#f2d3bc]"></div>
            <label className="mx-1" for="nude">
              Nude
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="peach"
              onChange={onChange}
              id="beige"
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#e1c699]"></div>
            <label className="mx-1" for="beige">
              Beige
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="white"
              onChange={onChange}
              id="off-white"
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#f4f0dd]"></div>
            <label className="mx-1" for="off-white">
              Off White
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="h-4 w-4 ml-2 mr-1"
              type="checkbox"
              value="peach"
              onChange={onChange}
              id="cream"
            ></input>
            <div className="w-8 h-4 mx-1 bg-[#fffdd0]"></div>
            <label className="mx-1" for="cream">
              Cream
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
