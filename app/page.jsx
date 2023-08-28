import Feed from '@components/feed'

const Home = () => {
  return (
    <section className="w-full flex-col flex-center">
        <h1 className="head_text text-center">Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
        </h1>
        <p className="desc text-center">PromptMania is a freely accessible AI toolset designed to facilitate the exploration, generation, and distribution of innovative prompts in today's fast-paced society.</p>
        <Feed />
    </section>
  )
}

export default Home