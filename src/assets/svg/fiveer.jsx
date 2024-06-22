

const Fiveer = () => {

  const OpenUpwork = () => {
    // Replace the URL with the desired link
    const url = 'https://www.upwork.com/freelancers/~01c3695e7102934612';
    // Open the URL in a new tab
    window.open(url, '_blank');
  };

  return (
    <svg
    onClick={OpenUpwork}
    className="cursor-pointer" 
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 256 256"
      width="50px"
      height="50px"
    >
      <g fill="#ffffff" fillRule="nonzero">
        <g transform="scale(5.12,5.12)">
          <path d="M25,2c-12.69071,0 -23,10.3093 -23,23c0,12.6907 10.30929,23 23,23c12.69071,0 23,-10.3093 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60983,0 21,9.39017 21,21c0,11.60983 -9.39017,21 -21,21c-11.60983,0 -21,-9.39017 -21,-21c0,-11.60982 9.39017,-21 21,-21zM26.5,11c-4.921,0 -8.09089,3.037 -8.46289,8h-4.03711v6h4v11h6v-11h4v11h6v-17h-9.93359c0.294,-1.999 1.51259,-2 2.43359,-2h2.53125v-6z"></path>
        </g>
      </g>
    </svg>
  );
};

export default Fiveer;