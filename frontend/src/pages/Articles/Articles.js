import React from 'react'
import "./Articles.css"
import ArticleLink from '../../components/ArticleLink/ArticleLink'
import testImage1 from "../../assets/testimage1.jpeg"
import testImage2 from "../../assets/testimage2.png"

function Articles() {

  const articleLink1 = "https://msu.edu/";
  const articleLink2 = "https://cse.msu.edu/";

  return (
    <div className='articles'>
      <ArticleLink image={testImage1} link={articleLink1}>
        Test 1
      </ArticleLink>
      <ArticleLink image={testImage2} link={articleLink2}>
        Test 2
      </ArticleLink>
      <ArticleLink image={testImage1} link={articleLink1}>
        Test 1
      </ArticleLink>
      <ArticleLink image={testImage2} link={articleLink2}>
        Test 2
      </ArticleLink>
      <ArticleLink image={testImage1} link={articleLink1}>
        Test 1
      </ArticleLink>
      <ArticleLink image={testImage2} link={articleLink2}>
        Test 2
      </ArticleLink>
      <ArticleLink image={testImage1} link={articleLink1}>
        Test 1
      </ArticleLink>
      <ArticleLink image={testImage2} link={articleLink2}>
        Test 2
      </ArticleLink>
    </div>
  )
}

export default Articles