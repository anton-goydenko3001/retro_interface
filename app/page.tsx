"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { topButtonsMenu, bottomSections } from "@/config/buttons"

export default function RetroInterface() {
  const [showTop, setShowTop] = useState(true)
  const [showBottom, setShowBottom] = useState(true)
  const [activeBtn, setActiveBtn] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [sections, setSections] = useState(bottomSections)
  const [launched, setLaunched] = useState<Set<number>>(new Set())

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Скрытие панелей при неактивности
  const resetTimer = () => {
    setShowTop(true)
    setShowBottom(true)

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setShowTop(false)
      setShowBottom(false)
      setOpenDropdown(null)
    }, 6000)
  }

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "touchmove"]
    events.forEach((event) => document.addEventListener(event, resetTimer))
    resetTimer()

    return () => {
      events.forEach((event) => document.removeEventListener(event, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Клик по главной кнопке - разворачивает меню
  const handleMainClick = (index: number, btn: any) => {
    setActiveBtn(btn.name)
    resetTimer()

    if (openDropdown === index) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(index)
    }

    setTimeout(() => {
      setActiveBtn(null)
    }, 400)
  }

  // Клик по кнопке подменю
  const handleSubmenuClick = (btn: any) => {
    setActiveBtn(btn.name)
    resetTimer()

    setTimeout(() => {
      setActiveBtn(null)
      if (btn.url) {
        window.open(btn.url, "_blank")
      }
    }, 400)
  }

  // Переключение секций
  const switchSection = (id: number, dir: string) => {
    resetTimer()
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          let newIdx = s.current
          if (dir === "left") {
            newIdx = newIdx > 0 ? newIdx - 1 : s.options.length - 1
          } else {
            newIdx = newIdx < s.options.length - 1 ? newIdx + 1 : 0
          }
          return { ...s, current: newIdx }
        }
        return s
      }),
    )
  }

  // Запуск секции
  const launchSection = (id: number) => {
    setLaunched((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
    resetTimer()
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Простой анимированный фон */}
      <div className="absolute inset-0 premium-bg" />

      {/* Простое затемнение */}
      <div className="absolute inset-0 z-2 premium-overlay" />

      {/* Верхняя панель - ПРОСТАЯ СЕТКА 4x8 */}
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 1.2,
            }}
            className="absolute top-4 sm:top-6 md:top-8 left-0 right-0 z-20"
            onMouseEnter={resetTimer}
            onTouchStart={resetTimer}
          >
            <div className="bg-transparent">
              <div className="p-2 sm:p-3 md:p-4 lg:p-6">
                <div className="max-w-full mx-auto">
                  {/* ПЕРВАЯ СТРОКА - 8 КНОПОК */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1 sm:gap-2 mb-2">
                    {topButtonsMenu.map((menuItem, index) => (
                      <ButtonWithDropdown
                        key={index}
                        menuItem={menuItem}
                        index={index}
                        activeBtn={activeBtn}
                        openDropdown={openDropdown}
                        onMainClick={handleMainClick}
                        onSubmenuClick={handleSubmenuClick}
                      />
                    ))}
                  </div>

                  {/* РАЗВЕРНУТЫЕ МЕНЮ ПОД КНОПКАМИ */}
                  <AnimatePresence>
                    {openDropdown !== null && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1 sm:gap-2">
                          {/* Показываем подменю под соответствующей кнопкой */}
                          {Array.from({ length: 8 }).map((_, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-1">
                              {colIndex === openDropdown
                                ? topButtonsMenu[openDropdown].submenu.map((subBtn: any, subIndex: number) => (
                                    <motion.button
                                      key={subIndex}
                                      onClick={() => handleSubmenuClick(subBtn)}
                                      className={`
                                        premium-button w-full h-10 sm:h-12 md:h-14 lg:h-16 flex items-center justify-center text-center relative overflow-hidden
                                        px-1 py-1 text-xs sm:text-sm font-mono font-bold
                                        ${activeBtn === subBtn.name ? "premium-button-active" : "premium-button-normal"}
                                      `}
                                      initial={{ opacity: 0, y: -20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: subIndex * 0.1 }}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      title={`${subBtn.desc}\nURL: ${subBtn.url || "Не задан"}`}
                                    >
                                      <span className="relative z-10 text-center leading-tight">{subBtn.name}</span>
                                      <div className="absolute inset-0 premium-button-bg" />
                                    </motion.button>
                                  ))
                                : null}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Нижняя панель - ПРОСТАЯ АДАПТАЦИЯ */}
      <AnimatePresence>
        {showBottom && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 1.2,
            }}
            className="absolute bottom-0 left-0 right-0 z-20"
            onMouseEnter={resetTimer}
            onTouchStart={resetTimer}
          >
            <div className="bg-transparent backdrop-blur-sm p-2 sm:p-3 md:p-4 lg:p-6">
              {/* МОБИЛЬНЫЕ - 2 колонки */}
              <div className="block sm:hidden">
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-2 gap-2 mb-2 last:mb-0">
                    {sections.slice(rowIndex * 2, (rowIndex + 1) * 2).map((section) => (
                      <PremiumSectionControl
                        key={section.id}
                        section={section}
                        isLaunched={launched.has(section.id)}
                        onSwitch={switchSection}
                        onLaunch={launchSection}
                        size="small"
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* ПЛАНШЕТЫ - 3 колонки */}
              <div className="hidden sm:block md:hidden">
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {sections.slice(0, 3).map((section) => (
                    <PremiumSectionControl
                      key={section.id}
                      section={section}
                      isLaunched={launched.has(section.id)}
                      onSwitch={switchSection}
                      onLaunch={launchSection}
                      size="medium"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {sections.slice(3, 6).map((section) => (
                    <PremiumSectionControl
                      key={section.id}
                      section={section}
                      isLaunched={launched.has(section.id)}
                      onSwitch={switchSection}
                      onLaunch={launchSection}
                      size="medium"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {sections.slice(6, 9).map((section) => (
                    <PremiumSectionControl
                      key={section.id}
                      section={section}
                      isLaunched={launched.has(section.id)}
                      onSwitch={switchSection}
                      onLaunch={launchSection}
                      size="medium"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {sections.slice(9, 10).map((section) => (
                    <PremiumSectionControl
                      key={section.id}
                      section={section}
                      isLaunched={launched.has(section.id)}
                      onSwitch={switchSection}
                      onLaunch={launchSection}
                      size="medium"
                    />
                  ))}
                </div>
              </div>

              {/* ДЕСКТОПЫ - 5 колонок */}
              <div className="hidden md:block">
                <div className="grid grid-cols-5 gap-4 mb-4">
                  {sections.slice(0, 5).map((section) => (
                    <PremiumSectionControl
                      key={section.id}
                      section={section}
                      isLaunched={launched.has(section.id)}
                      onSwitch={switchSection}
                      onLaunch={launchSection}
                      size="large"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {sections.slice(5, 10).map((section) => (
                    <PremiumSectionControl
                      key={section.id}
                      section={section}
                      isLaunched={launched.has(section.id)}
                      onSwitch={switchSection}
                      onLaunch={launchSection}
                      size="large"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Компонент кнопки с выпадающим меню
function ButtonWithDropdown({ menuItem, index, activeBtn, openDropdown, onMainClick, onSubmenuClick }: any) {
  return (
    <motion.button
      onClick={() => onMainClick(index, menuItem.main)}
      className={`
        premium-button w-full h-10 sm:h-12 md:h-14 lg:h-16 flex items-center justify-center text-center relative overflow-hidden
        px-1 py-1 text-xs sm:text-sm font-mono font-bold
        ${activeBtn === menuItem.main.name || openDropdown === index ? "premium-button-active" : "premium-button-normal"}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      title={`${menuItem.main.desc}\nКликни для раскрытия меню`}
    >
      <span className="relative z-10 text-center leading-tight">{menuItem.main.name}</span>
      <div className="absolute inset-0 premium-button-bg" />
    </motion.button>
  )
}

// Компонент секции управления
function PremiumSectionControl({ section, isLaunched, onSwitch, onLaunch, size = "medium" }: any) {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          container: "premium-section-control-small",
          button: "text-xs font-mono font-medium",
          arrow: "premium-arrow-small",
        }
      case "medium":
        return {
          container: "premium-section-control-medium",
          button: "text-sm font-mono font-medium",
          arrow: "premium-arrow-medium",
        }
      case "large":
        return {
          container: "premium-section-control",
          button: "text-sm font-mono font-medium",
          arrow: "premium-arrow-button",
        }
      default:
        return {
          container: "premium-section-control-medium",
          button: "text-sm font-mono font-medium",
          arrow: "premium-arrow-medium",
        }
    }
  }

  const classes = getSizeClasses()

  return (
    <div className={classes.container}>
      {/* Левая стрелка */}
      <motion.button
        onClick={() => onSwitch(section.id, "left")}
        className={classes.arrow}
        whileHover={{ scale: 1.2, rotateZ: -5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="premium-arrow-left" />
      </motion.button>

      {/* Центральная кнопка */}
      <motion.button
        onClick={() => onLaunch(section.id)}
        className={`premium-center-button ${classes.button} ${isLaunched ? "premium-center-active" : "premium-center-normal"}`}
        whileHover={{ scale: 1.05, rotateX: 5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="relative z-10">{section.options[section.current]}</span>
        <div className="absolute inset-0 premium-center-bg" />
      </motion.button>

      {/* Правая стрелка */}
      <motion.button
        onClick={() => onSwitch(section.id, "right")}
        className={classes.arrow}
        whileHover={{ scale: 1.2, rotateZ: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="premium-arrow-right" />
      </motion.button>
    </div>
  )
}
